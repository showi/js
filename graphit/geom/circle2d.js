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
    var Vector3d = require('graphit/math/vector3d');
    var eMat = require('graphit/enum/matrix33');
    var Base2d = require('graphit/geom/base2d');
    var scene = require('graphit/scene/util');
    var TransformMixin = require('graphit/scene/mixin/transform');
    var m = require('graphit/enum/matrix33');
    var eCap = require('graphit/enum/capability');

    function CIRCLE2D(x, y, radius) {
        console.log('NEW circle', x, y, radius);
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
                console.log('set y', y);
                this.transform._data[eMat.mY] = y;
            }
        });
//        Object.defineProperty(this, 'radius', {
//            get : function() {
//                return this.transform._data[eMat.mSx];
//            },
//            set : function(radius) {
//                this.transform._data[eMat.mSx] = radius;
//                this.transform._data[eMat.mSy] = radius;
//            }
//        });
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
        this.radius = (radius === undefined) ? 1 : radius;
        scene.setCapability(this, eCap.render);
        scene.setCapability(this, eCap.transform);
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
        shape.circle(ctx, 0, 0, this.radius);
//        ctx.rect(-10, -10, 20, 20);
//        ctx.fill();
        console.log('x/y/radius', this.x, this.y, this.radius);
    };

    CIRCLE2D.prototype.toString = function() {
        return '<Circle2d transform=' + this.transform.toString() + '>';
    };

    return CIRCLE2D;
});
