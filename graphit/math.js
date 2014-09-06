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
        }
    };
    MATH.__namespace__ = 'graphit/math';
  
    ns[_ns_] = MATH;
    return ns[_ns_];
});
