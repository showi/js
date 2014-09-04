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
    ns = ns.math;
    var _ns_ = 'line';
    if (_ns_ in ns && ns[_ns_] !== undefined) {
        return ns[_ns_];
    }

    function LINE(a, b) {
        this.__namespace__ = 'graphit/math/line';
        this.a = a;
        this.b = b;
    };

    LINE.prototype.toString = function() {
        return '<Line a: ' + this.a.toString() + 
               ', b: ' + this.b.toString() + '>';
    };

    ns[_ns_] = LINE;
    return ns[_ns_];
});