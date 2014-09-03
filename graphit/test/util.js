define(function(require) {
    var ns = require('graphit/namespace');
    ns = ns.test;
    _ns_ = 'util';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }
    
    var logElement = jQuery('<div class="graphit-container-log"></div>');
    jQuery('body').append(logElement);
    
    var UTIL = {
        numPass : 10000000,
        logElement: logElement,
        log : function() {
            console.log.apply(console, arguments);
            if (this.logElement === undefined) {
                return;
            }
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
            this.log('[', this.numPass, '] testFunction >>>',
                     module.toString(), '/', fName, '--- -- ---');
            var lastResult = undefined;
            var st = Date.now();
            for (var i = 0; i < this.numPass; i++) {
                lastResult = fn();
            }
            var diff = Date.now() - st;
            this.log('[', this.numPass, '] testFunction <<<',
                     module.toString(), '/', fName, diff, 'ms');
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
                for (key in test) {
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
