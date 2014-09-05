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
    var eAxis = require('graphit/enum/axis');

    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'shape';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var VALIDATORS = {
        kind : {
            required : true
        },
        position : {
            required : false,
        },
        size : {
            required : true,
        },
    };

    function SHAPE() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/shape';
        this.setParameters(arguments, VALIDATORS);
        tree.setCapability(this, eCap.draw);
        this.setUp(this.kind);
    };

    SHAPE.prototype = Object.create(Node.prototype);
    TransMixin.call(SHAPE.prototype);

    SHAPE.prototype.setUp = function(kind) {
//        this.fillStyle = 'red';
//        this.transform.position(0, 0);
        var meth = 'setUp_' + kind;
        return this[meth]();
    };

    SHAPE.prototype.setUp_line = function() {
        //console.log('Setting up line:');
        this.a = this.size.a;
        this.b = this.size.b;

    };

    SHAPE.prototype.setUp_rectangle = function() {
        this.u = new Vector2d(this.size.width / 2, 0);
        this.v = new Vector2d(0, this.size.height / 2);
    };

    SHAPE.prototype.draw = function(renderer) {
        var meth = 'draw_' + this.kind;
        return this[meth](renderer);
    };

    SHAPE.prototype.draw_line = function(renderer) {
        var dSize = this.size / 2;
        shape.line(renderer.ctx, -dSize, 0, dSize, 0);
    };

    SHAPE.prototype.draw_rectangle = function(renderer) {
        renderer.ctx.fillStyle = 'red';
        shape.circle(renderer.ctx, 0, 0, 10);
        console.log(-this.u.x, -this.v.y, this.u.x, this.v.y);
        shape.rectangle(renderer.ctx, -this.u.x, -this.v.y, this.u.x, this.v.y);
        renderer.ctx.strokeStyle = eAxis.uColor;
        shape.line(renderer.ctx, 0, 0, this.u.x, this.u.y);
        renderer.ctx.strokeStyle = eAxis.vColor;
        shape.line(renderer.ctx, 0, 0, this.v.x, this.v.y);
        
        //        shape.rectangle(renderer.ctx,
//                        -this.vx.x, this.vy.y, 
//                        this.vx.x, -this.vy.y);
    };

    ns[_ns_] = SHAPE;
    return ns[_ns_];
});
