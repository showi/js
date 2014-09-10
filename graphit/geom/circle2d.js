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
    var eMat = require('graphit/enum/matrix33');
    var Base2d = require('graphit/geom/base2d');

    var TransformMixin = require('graphit/scene/mixin/transform');
    var m = require('graphit/enum/matrix33');

    ns = ns.geom;
    var _ns_ = 'circle2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function CIRCLE2D(x, y, radius) {
        Base2d.call(this, arguments);
        Object.defineProperty(this, 'x', {
            get : function() {
                return this.transform._data[eMat.mX];
            },
            set : function(x) {
                this.transform._data[eMat.mX] = x;
            }
        });
        Object.defineProperty(this, 'y', {
            get : function() {
                return this.transform._data[eMat.mY];
            },
            set : function(y) {
                this.transform._data[eMat.mY] = y;
            }
        });
        Object.defineProperty(this, 'radius', {
            get : function() {
                return this.transform._data[eMat.mSx];
            },
            set : function(radius) {
                this.transform._data[eMat.mSx] = radius;
                this.transform._data[eMat.mSx] = radius;
            }
        });

        this.x = (x === undefined) ? 0 : x;
        this.x = (y === undefined) ? 0 : y;
        this.radius = (radius === undefined) ? 1 : radius;
    }
    CIRCLE2D.prototype = Object.create(Base2d.prototype);
    TransformMixin.call(CIRCLE2D.prototype);

    CIRCLE2D.__namespace__ = 'graphit/geom/circle2d';

    CIRCLE2D.prototype.clone = function() {
        return new CIRCLE2D(this.position.x, this.position.y, this.radius);
    };

    CIRCLE2D.prototype.copy = function(circle) {
        this.transform.copy(circle.transform);
    };

    CIRCLE2D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
        this.radius = Math.random();
    };

    CIRCLE2D.prototype.draw = function(ctx) {
        shape.circle(ctx, this.x, this.y, this.radius);
    };

    CIRCLE2D.prototype.toString = function() {
        return '<Circle2d transform=' + this.transform.toString() + '>';
    };

    ns[_ns_] = CIRCLE2D;
    return ns[_ns_];
});
