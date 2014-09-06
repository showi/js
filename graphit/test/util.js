/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
*/
define(function(require) {

    'use strict';

    var namespace = require('graphit/namespace');
    var ns = namespace.test;
    var _ns_ = 'util';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var logElement = jQuery('<div class="graphit-container log"></div>');
    jQuery('body').append(logElement);

    var UTIL = {
        __namespace__: 'graphit/test/util',
        numPass : 10000000,
        logElement : logElement,
        log : function() {
            console.log.apply(console, arguments);
            if (this.logElement === undefined) { return; }
            var msg = '';
            for (var i = 0; i < arguments.length; i++) {
                var a = arguments[i] + '';
                a = a.replace('<', '&lt;');
                a = a.replace('>', '&gt;');
                msg += a + ' ';
            }
            msg = jQuery('<div class="msg"><pre>' + msg + '</pre></div>');
            function append() {
                logElement.append(msg);
            };
            setTimeout(append, 250);
        },
        testFunction : function(module, fName, fn) {
            this.log('[', this.numPass, '] testFunction >>>', module
                    .toString(), '/', fName, '--- -- ---');
            var lastResult = undefined;
            var st = Date.now();
            for (var i = 0; i < this.numPass; i++) {
                lastResult = fn();
            }
            var diff = Date.now() - st;
            this.log('[', this.numPass, '] testFunction <<<', module
                    .toString(), '/', fName, diff, 'ms');
            return lastResult;
        },
        testMethod : function(m, name, value) {
            var pass = PASS;
            var st = new Date();
            var f = m[name];
            var lastResult = undefined;
            for (var i = 0; i < pass; i++) {
                lastResult = f.call(m, value);
            }
            var et = new Date();
            var diff = et - st;
            log('[', PASS, '] Speed for', name, '>', diff, 'ms');
            return lastResult;
        },
        catchException : function(obj, meth) {
            try {
                return obj[meth].call(obj);
            } catch (e) {
                console.error('Exception', e);
                console.error(e.stack);
                console.error(new Error().stack);
            }
            return false;
        },
        runTest : function(name) {
            var that = this;
            require(['graphit/test/unit/' + name], function(test) {
                console.log('>>>>> Running test', name, '(',
                            test.__namespace__, ')');
                if (name in graphit.test) { throw 'TestAlreadyRunning'; }
                graphit.test[name] = test;
                for (var key in test) {
                    if (key.startsWith('test_') && !test.hasOwnProperty(key)) {
                        console.log('>>>', key);
                        that.catchException(test, key);
                    }
                }
                if ('run' in test) {
                    if (!test.hasOwnProperty('run')) {
                        console.log('>>> run');
                        that.catchException(test, 'run');
                    }
                }
            });
        }
    };
    ns[_ns_] = UTIL;
    return ns[_ns_];
});
