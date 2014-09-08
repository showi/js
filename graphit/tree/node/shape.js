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

    var Node = require('graphit/tree/node/node');
    var eCap = require('graphit/enum/capability');
    var tree = require('graphit/tree/util');
    var TransMixin = require('graphit/tree/mixin/transform');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');
    var eAxis = require('graphit/enum/axis');
    var eShape = require('graphit/enum/shape');
    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'shape';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var VALIDATORS = {
        kind : {
            required : true
        },
        pos : {
            required : false,
        },
        size : {
            required : true,
        },
    };

    function SHAPE() {
        Node.call(this, arguments);
        this.setParameters(arguments, VALIDATORS);
        this.transform = new Matrix33();
        this.worldTransform = new Matrix33();
        tree.setCapability(this, eCap.render);
        tree.setCapability(this, eCap.draw);
        tree.setCapability(this, eCap.transform);
        this.setUp(this.kind);
    };
    SHAPE.prototype = Object.create(Node.prototype);
    SHAPE.__namespace__ = 'graphit/tree/node/shape';
    TransMixin.call(SHAPE.prototype);

    SHAPE.prototype.setUp = function(kind) {
        var meth = 'setUp_' + eShape.reverse(kind);
        this.transform.positionX(this.pos.x);
        this.transform.positionY(this.pos.y);
        return this[meth]();
    };

    SHAPE.prototype.setUp_line = function() {
        // console.log('Setting up line:');
        this.a = this.size.a;
        this.b = this.size.b;

    };

    SHAPE.prototype.setUp_rectangle = function() {
        this.u = new Vector2d(this.size.width / 2, 0);
        this.v = new Vector2d(0, this.size.height / 2);
    };
    
    SHAPE.prototype.setUp_circle = function() {
        this.u = new Vector2d(this.size.width / 2, 0);
        this.size.height = this.size.width;
    };
    
    SHAPE.prototype.draw = function(renderer) {
        var meth = 'draw_' + eShape.reverse(this.kind);
        return this[meth](renderer);
    };

    SHAPE.prototype.draw_line = function(renderer) {
        var dSize = this.size / 2;
        shape.line(renderer.ctx, -dSize, 0, dSize, 0);
    };

    SHAPE.prototype.draw_circle = function(renderer) {
        shape.circle(renderer.ctx, 0, 0, this.u.x);
    };

    SHAPE.prototype.draw_rectangle = function(renderer) {
        if (this.fillStyle !== undefined) {
            renderer.ctx
                .fillRect(-this.u.x, -this.v.y, this.u.x * 2, this.v.y * 2);
        }
        if (this.strokeStyle !== undefined) {
            renderer.ctx
            .strokeRect(-this.u.x, -this.v.y, this.u.x * 2, this.v.y * 2);
        }
    };

    ns[_ns_] = SHAPE;
    return ns[_ns_];
});
