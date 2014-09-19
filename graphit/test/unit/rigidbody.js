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

    var Canvas = require('graphit/draw/canvas');
    var RigidBody = require('graphit/scene/component/rigidbody2d');
    var Transform = require('graphit/scene/component/transform');
    var Shape = require('graphit/scene/node/shape');
    var ShapeRenderer = require('graphit/scene/component/renderer/shape');
    var eKind = require('graphit/enum/shape');
    var ParameterMixin = require('graphit/mixin/argument');
    var shape = require('graphit/draw/shape');
    var Vector3d = require('graphit/math/vector3d');
    var GameObject = require('graphit/scene/gameobject');
    var Renderer = require('graphit/renderer');
    var tool = require('graphit/draw/tool');
    var util = require('graphit/util');

    function Circle(renderer, x, y, radius, fillStyle) {
        this.kind = eKind.circle;
        Shape.call(this, {
            kind : eKind.circle,
            pos : new Vector3d(x, y),
            size : {
                width : radius,
            }
        });
        this.addComponent(RigidBody);
        this.addComponent(renderer);
        this.rigidbody2d.velocity = new Vector3d(1.0, 0.0);
        this.fillStyle = fillStyle;
    };

    Circle.prototype = Object.create(Shape.prototype);
    ParameterMixin.call(Circle.prototype);

    
    function Unit(renderer, x, y, radius, fillStyle) {
        Circle.apply(this, arguments);
        this.fillStyle = 'blue';
        this.strokeStyle = 'white';
    }
    Unit.prototype = Object.create(Circle.prototype);
    ParameterMixin.call(Unit.prototype);

    function T_RIGIDBODY() {
        var size = util.documentSize();
        this.size = size;
        this.width = size.x;
        this.height = size.y;
        var world = new GameObject();
        world.addComponent(Transform);
        world.transform
                .position(new Vector3d(this.width / 2, this.height / 2));
        this.world = world;
        this.setupCanvas(this.width, this.height);
        this.setupRenderer();
        this.setupHtml();
    };

    T_RIGIDBODY.prototype.setupRenderer = function(width, height) {
        var that = this;
        var renderer = new Renderer({
            root : this.world,
            ctx : this.ctx,
        });
        renderer.update = function(node, elapsed) {
            if (node.isRotating === undefined) return true;
            var r = node.isRotating * elapsed;
            if (r > 360) {
                r /= 360;
            }
            node.transform.rotate(r);
        };
        renderer.render = function(node) {
            node.renderer(this, node);
            console.log('render');
        };
        renderer.draw_init = function() {
            this.ctx.save();
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, that.width, that.height);
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 0.1;
            shape.grid(this.ctx, that.width, that.height, 10, 10);
            this.ctx.restore();
        };
        this.renderer = renderer;
    };

    T_RIGIDBODY.prototype.setupHtml = function(width, height) {
        var body = jQuery('body');
        body.append(this.canvas.element);
        this.body = body;
    };

    T_RIGIDBODY.prototype.setupCanvas = function(width, height) {
        var canvas = new Canvas({
            width : width,
            height : height
        });
        this.ctx = canvas.getCtx();
        this.canvas = canvas;
    };

    T_RIGIDBODY.prototype.run = function() {
        var that = this;
        var shapeRenderer = new ShapeRenderer();
        var e01 = new Unit(shapeRenderer, 0, 0, 20);
        e01.rigidbody2d.addForce(new Vector3d(1.0, 0));
        console.log(e01);
        this.world.appendChild(e01);
        
        function loop() {
            that.renderer.step();
//            throw "BOOM";
            setTimeout(loop, 1000 / 120);
        }
        loop();
    };

    T_RIGIDBODY.__namespace__ = 'graphit/test/unit/rigidbody';

    return new T_RIGIDBODY();
});
