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

    var ns = require('graphit/namespace');
    var _ns_ = 'util';
    var math = require('graphit/math');
    var Vector2d = require('graphit/math/vector2d');
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }
    
    var documentElement = jQuery(document);
    var windowElement = jQuery(window);

    var UTIL = {
        __namespace__ : 'graphit/util',
        genUID : function() {
            return graphit.genUID();
        },
        emptyArray: function(a) {
            while(a.length > 0)
                a.pop();
        },
        injectProperties : function(obj, properties) {
            for (var i = 0; i < properties.length; i++) {
                var meth = properties[i];
                var key = '_' + meth;
                if (!(key in obj)) {
                    obj[key] = undefined;
                }
                console.log('getter/setter', meth, key);
                obj.prototype[meth] = function(value) {
                    if (value === undefined) { return obj[key]; }
                    obj[key] = value;
                    return this;
                };
            }
        },
        windowSize : function() {
            
            return new Vector2d(windowElement.width(),
                                windowElement.height());
        },
        documentSize : function() {
            return new Vector2d(documentElement.width(),
                                documentElement.height());
        },
        setParameters : function(that, options, validators) {
            this.checkParameters(options, validators);
            for (key in options) {
                that[key] = options[key];
            }
        },
        checkParameters : function(options, validators) {
            for (name in options) {
                if (!(name in validators)) {
                    console.error('Invalid Field:', name);
                    throw 'InvalidField';
                }
            }
            for (name in validators) {
                if (!(name in options)) {
                    console.error('Missing parameter: ', name);
                    throw 'MissingParameter';
                }
                var value = options[name];
                if (this.isNullOrUndef(value)) {
                    if ('required' in validators[name]) {
                        if (!('default' in validators[name])) {
                            console.error('Missing Parameter:', name);
                            throw 'MissingParameter';
                        }
                    }

                }
            }
        },
        join : function(a, separator) {
            var s = '';
            for (var i = 0; i < a.length; i++) {
                s += a[i] + separator;
            }
            return s;
        },
        isNullOrUndef : function(value) {
            if (value === undefined || value == null) { return true; }
            return false;
        },
        getGlobal : function() {
            return window.graphit;
        },
        choice : function(choices) {
            return choices[math.randInt(0, choices.length)];
        },
        isArray : function(value) {
            return (Object.prototype.toString.call(value) === 
                '[object Array]');
        },
        isString : function(value) {
            return (typeof value) === "string";
        },
        isBoolean : function(value) {
            return (typeof value) === "boolean";
        },
        isNumber : function(value) {
            return (typeof value) === "number";
        },
        ucFirst : function(value) {
            if (value.length < 1) { return value; }
            var fl = value.slice(0, 1).toUpperCase();
            return fl + value.slice(1);
        },
        isFunction : function(value) {
            return (typeof value) === 'function';
        },
    };
    UTIL.__namespace__ = 'graphit/util';

    ns[_ns_] = UTIL;
    return ns[_ns_];
});
