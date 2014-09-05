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

    var graphit = require('./namespace');
    var Vector2d = require('graphit/math/vector2d');
    var documentElement = jQuery(document);
    var windowElement = jQuery(window);

    var UTIL = {
        __MODULE__ : 'graphit/util',
        genuid : function() {
            if (graphit.__GENUID__ === undefined) {
                graphit.__GENUID__ = 0;
            }
            return graphit.__GENUID__++;
        },
//        injectMixin : function(cls, mixin) {
//            if ('prototype' in mixin) {
//                for (key in mixin.prototype) {
//                    if (key in cls.prototype) {
//                        console.warn('Method already set', key, "exit..");
//                        return false;
//                    }
//                    cls.prototype[key] = mixin.prototype[key];
//                }
//            } else {
//                for (key in mixin) {
//                    var fn = mixin[key];
//                    if (this.isFunction(fn)) {
//                        cls.prototype[key] = fn;
//                    } else {
//                        cls[key] = fn;
//                    }
//                }
//            }
            // console.log('injecting constructor', mixin.constructor);
            // if('constructor' in mixin) {
            // var oc = cls.prototype.constructor;
            // function nc() {
            // console.log('IN constructor');
            // mixin.constructor.apply(this, arguments);
            // oc.apply(this, arguments);
            // return this;
            // };
            // cls.prototype.constructor = nc;
            // // cls.prototype = Object.create(cls);
            // }
//            return true;
//        },
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
            return choices[Math.randInt(0, choices.length)];
        },
        isArray : function(value) {
            return Object.prototype.toString.call(value) === Object.prototype.toString
                    .call([]);
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
        getMin : function(values) {
            if (!this.isArray(values)) {
                values = [values];
            }
            var min = values[0];
            for (var i = 1; i < values.length; i++) {
                if (values[i] < min) {
                    min = values[i];
                }
            }
            return min;
        },
    // centerElement : function(elm) {
    // /*
    // *@bug: Fail to align element vertically
    // */
    // console.log('Center');
    // console.log('height', windowElement.height());
    // console.log('outerHeight', elm.outerHeight());
    // console.log('scrollTop', windowElement.scrollTop());
    // elm.css("position", "absolute");
    // elm.css("top",
    // Math.max(0, ((windowElement.height() - elm.outerHeight()) / 2)
    // + windowElement.scrollTop())
    // + "px");
    // elm.css("left",
    //               Math.max(0, ((windowElement.width() - elm.outerWidth()) / 2)
    //                    + windowElement.scrollLeft())
    //                    + "px");
    //        },

    };
    return UTIL;
});
