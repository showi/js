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

    var TransformMixin = require('graphit/scene/mixin/transform');
    var m = require('graphit/enum/matrix33');

    ns = ns.geom;
    var _ns_ = 'base2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function BASE2D() {
        this.enable_transform();
    }
    TransformMixin.call(BASE2D.prototype);

    BASE2D.__namespace__ = 'graphit/geom/base2d';

    BASE2D.prototype.clone = function() {
        return new BASE2D(this.position.x, this.position.y, this.radius);
    };

    BASE2D.prototype.copy = function(circle) {
        this.transform.copy(circle.transform);
    };

    BASE2D.prototype.randomize = function() {
        this.transform._data[m.mX] = Math.random();
        this.transform._data[m.mY] = Math.random();
        this.u.x = Math.random();
    };

    BASE2D.prototype.draw = function(ctx) {
        shape.circle(ctx, 0, 0, this.u.x);
    };

    BASE2D.prototype.toString = function() {
        return '<Circle2d transform=' + this.transform.toString() + '>';
    };

    ns[_ns_] = BASE2D;
    return ns[_ns_];
});
