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
    var RigidBody = require('graphit/scene/component/rigidbody');
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

    function Circle(renderer, x, y, radius, fillStyle) {
        this.kind = eKind.circle;
        Shape.call(this, {
            kind : eKind.circle,
            pos : new Vector3d(x, y),
            size : {
                width: radius,
            }
        });
        this.addComponent(RigidBody);
        this.addComponent(renderer);
        this.rigidbody.velocity = new Vector3d(1.0, 0.0);
        this.fillStyle = fillStyle;
    };

    Circle.prototype = Object.create(Shape.prototype);
    ParameterMixin.call(Circle.prototype);

    function T_RIGIDBODY() {
        this.width = 800;
        this.height = 600;
        var world = new GameObject();
        world.addComponent(Transform);
        world.transform.position(new Vector3d(this.width / 2, this.height / 2));
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
            if (node.name != 'circle2' && node.name != 'circle3')
                return true;
            var r = 0.1 * elapsed;
            if(r>360) {
                r /= 360;
            }
//            console.log('rotate', r);
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
        this.ctx.save();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 0.1;
        shape.grid(this.ctx, this.width, this.height, 10, 10);
        this.ctx.save();
        console.log('Testing rigidbody');
        var shapeRenderer = new ShapeRenderer();
        var circle = new Circle(shapeRenderer, 0, 0, 50, tool.randomColor());
        this.world.appendChild(circle);
        var circle2 = new Circle(shapeRenderer, 75, 0, 25, tool.randomColor());
//        circle2.transform.translate(new Vector3d(50, 0));
        circle2.name = 'circle2';
        circle.appendChild(circle2);
        
        var circle3 = new Circle(shapeRenderer, 25, 0, 5, tool.randomColor());
        circle3.name = 'circle3';
        circle2.appendChild(circle3);
        var that = this;
        
        var rotation = 1;

        function loop() {
            that.renderer.step();
//            throw "ONE STEP";
            setTimeout(loop, 1000 / 33);
        }
        loop();
    };

    T_RIGIDBODY.__namespace__ = 'graphit/test/unit/rigidbody';

    return new T_RIGIDBODY();
});
