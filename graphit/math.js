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

    var _ns_ = 'math';
    //    var util = require('graphit/util');

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var MATH = {
        __namespace__ : 'graphit/math',
        round : function(value, precision) {
            var factor = 1;
            if (precision === undefined) {
                precision = 0;
            } else {
                precision = Math.round(precision);
            }
            if (precision < 0 || precision > 10) { throw 'ValueError'; }
            if (precision != 0) {
                factor = Math.pow(10, precision);
            }
            return Math.round(value * factor) / factor;
        },
        floor : function(value, precision) {
            var factor = 1;
            if (precision === undefined) {
                precision = 0;
            } else {
                precision = Math.round(precision);
            }
            if (precision < 0 || precision > 10) { throw 'ValueError'; }
            if (precision != 0) {
                factor = Math.pow(10, precision);
            }
            return Math.floor(value * factor) / factor;
        },
        distance : function(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        },
        clamp : function(value, min, max) {
            if (value > max) {
                return max;
            } else if (value < min) { return min; }
            return value;
        },
        min : function() {
            var min = undefined;
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                var type = Object.prototype.toString.call(arg);
                if (type === '[object Array]') {
                    for (var j = 0; j < arg.length; j++) {
                        if (min === undefined || arg[j] < min) {
                            min = arg[j];
                        }
                    }
                } else {
                    if (min === undefined || arg < min) {
                        min = arg;
                    }
                }
            }
            return min;
        },
        max : function() {
            var max = undefined;
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                var type = Object.prototype.toString.call(arg);
                if (type === '[object Array]') {
                    for (var j = 0; j < arg.length; j++) {
                        if (max === undefined || arg[j] > max) {
                            max = arg[j];
                        }
                    }
                } else {
                    if (max === undefined || arg > max) {
                        max = arg;
                    }
                }
            }
            return max;
        },
        randInt : function(a, b) {
            if (b === undefined) {
                b = a;
                a = 0;
            }
            return Math.floor((Math.random() * (b - a) + a));
        },
        randFloat : function(a, b) {
            if (b === undefined) {
                b = a;
                a = 0;
            }
            return Math.random() * (b - a) + a;
        },
        choice : function(list) {
            return list[this.randInt(0, list.length)];
        }
    };
    MATH.__namespace__ = 'graphit/math';

    ns[_ns_] = MATH;
    return ns[_ns_];
});
