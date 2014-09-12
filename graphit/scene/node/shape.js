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

    var Node = require('graphit/scene/node/node');
    var eCap = require('graphit/enum/capability');
    var scene = require('graphit/scene/util');
    var TransMixin = require('graphit/scene/mixin/transform');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');
    var eAxis = require('graphit/enum/axis');
    var eShape = require('graphit/enum/shape');
    var ns = require('graphit/namespace');
    var fact = require('graphit/math/namespace');
    ns = ns.scene.node;
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
        this.transform = fact.matrix33.Create();
        this.worldTransform = fact.matrix33.Create();
        scene.setCapability(this, eCap.render);
        scene.setCapability(this, eCap.draw);
        scene.setCapability(this, eCap.transform);
        this.setUp(this.kind);
    };
    SHAPE.prototype = Object.create(Node.prototype);
    SHAPE.__namespace__ = 'graphit/scene/node/shape';
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
        Object.defineProperty(this, 'width', {
            get: function() {
                return this.u.x * 2;
            },
            set: function(width) {
                return this.u.x = width / 2;
            },
        });
        Object.defineProperty(this, 'height', {
            get: function() {
                return this.v.y * 2;
            },
            set: function(height) {
                return this.v.y = height / 2;
            },
        });
        this.u = new Vector2d(this.size.width / 2, 0);
        this.v = new Vector2d(0, this.size.height / 2);
    };
    
    SHAPE.prototype.setUp_circle = function() {
        Object.defineProperty(this, 'width', {
            get: function() {
                return this.u.x * 2;
            },
            set: function(width) {
                return this.u.x = width / 2;
            },
        });
        Object.defineProperty(this, 'height', {
            get: function() {
                return this.u.x * 2;
            },
            set: function(height) {
                return this.u.x = height / 2;
            },
        });
        this.u = new Vector2d(this.size.width / 2, 0);
    };
    
    SHAPE.prototype.draw = function(renderer) {
        var meth = 'draw_' + eShape.reverse(this.kind);
        return this[meth](renderer);
    };
    SHAPE.prototype.render = function(renderer) {
        return this.draw(renderer);
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
