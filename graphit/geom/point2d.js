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
    ns = ns.geom;
    var _ns_ = 'point2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function POINT2D(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }

    POINT2D.__namespace__ = 'graphit/geom/point2d';

    POINT2D.prototype.clone = function() {
        return new POINT2D(this.x, this.y);
    };

    POINT2D.prototype.copy = function(v) {
        this.x = v.x;
        this.y = v.y;
    };

    POINT2D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
    };

    POINT2D.prototype.toString = function() {
        return '<Point2d x=' + this.x + ', y=' + this.y + '>';
    };
    ns[_ns_] = POINT2D;
    return ns[_ns_];
});
