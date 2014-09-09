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
    var Point = require('graphit/geom/point2d');
    var shape = require('graphit/draw/shape');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    
    var TransformMixin = require('graphit/tree/mixin/transform');
    var m = require('graphit/enum/matrix33');

    ns = ns.geom;
    var _ns_ = 'circle2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function CIRCLE2D(x, y, radius) {
        x = (x === undefined)? 0: x;
        y = (y === undefined)? 0: y;
        radius = (radius === undefined)? 1: radius;
        this.transform = new Matrix33();
        this.worldTransform = new Matrix33();
        this.positionXY(x, y);
        this.u = new Vector2d(radius, 0);
    }

    TransformMixin.call(CIRCLE2D.prototype);

    CIRCLE2D.__namespace__ = 'graphit/geom/circle2d';

    CIRCLE2D.prototype.clone = function() {
        return new CIRCLE2D(this.position.x, this.position.y, this.radius);
    };

    CIRCLE2D.prototype.copy = function(circle) {
        this.transform.copy(circle.transform);
    };

    CIRCLE2D.prototype.randomize = function() {
        this.transform._data[m.mX] = Math.random();
        this.transform._data[m.mY] = Math.random();
        this.u.x = Math.random();
    };

    CIRCLE2D.prototype.draw = function(ctx) {
        shape.circle(ctx, 0, 0, this.u.x);
    };

    CIRCLE2D.prototype.toString = function() {
        return '<Circle2d transform=' + this.transform.toString() + '>';
    };

    ns[_ns_] = CIRCLE2D;
    return ns[_ns_];
});
