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
    ns = ns.geom;
    var _ns_ = 'line2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function LINE2D(a, b) {
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
        this.a = a;
        this.b = b;
        this.x = 0;
        this.y = 0;
        scene.setCapability(this, eCap.render);
        scene.setCapability(this, eCap.transform);
    }
    LINE2D.prototype = Object.create(Base2d.prototype);
    TransformMixin.call(LINE2D.prototype);

    LINE2D.__namespace__ = 'graphit/geom/circle2d';

    LINE2D.prototype.clone = function() {
        return new LINE2D(this.a, this.b);
    };

    LINE2D.prototype.copy = function(circle) {
        this.transform.copy(circle.transform);
    };

    LINE2D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
        this.radius = Math.random();
    };

    LINE2D.prototype.draw = function(ctx) {
        console.log('Draw line');
        shape.line(ctx, this.a.x, this.a.y, this.b.x, this.b.y);
    };

    LINE2D.prototype.toString = function() {
        return '<Circle2d transform=' + this.transform.toString() + '>';
    };

    ns[_ns_] = LINE2D;
    return ns[_ns_];
});
