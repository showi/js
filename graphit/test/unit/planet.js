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
    var util = require('graphit/util');

    var planets = {
        sun : {
            position : new Vector3d(),
            radius : 100,
        },
        mercure : {
            position : new Vector3d(100, 0),
            radius : 5,
            parent : 'sun',
            rotation : 0.01
        },
        venus : {
            position : new Vector3d(110, 0),
            radius : 10,
            parent : 'sun',
            rotation : 0.015
        },
        terre : {
            position : new Vector3d(125, 0),
            radius : 9,
            parent : 'sun',
            rotation : 0.016
        },
        lune : {
            position : new Vector3d(13, 0),
            radius : 3,
            parent : 'terre',
            rotation : 0.1
        },
        mars : {
            position : new Vector3d(145, 0),
            radius : 5,
            parent : 'sun',
            rotation : 0.018,
        },
        jupiter : {
            position : new Vector3d(155, 0),
            radius : 20,
            parent : 'sun',
            rotation : 0.019,
        },
        saturne : {
            position : new Vector3d(180, 0),
            radius : 15,
            parent : 'sun',
            rotation : 0.020,
        },
        uranus : {
            position : new Vector3d(200, 0),
            radius : 10,
            parent : 'sun',
            rotation : 0.021,
        },
        neptune : {
            position : new Vector3d(215, 0),
            radius : 10,
            parent : 'sun',
            rotation : 0.022
        },
    };

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
        this.rigidbody.velocity = new Vector3d(1.0, 0.0);
        this.fillStyle = fillStyle;
    };

    Circle.prototype = Object.create(Shape.prototype);
    ParameterMixin.call(Circle.prototype);

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

    T_RIGIDBODY.prototype.buildTree = function(shapeRenderer, data) {
        var p = {};
        for ( var name in planets) {
            planets[name].name = name;
            var planet = planets[name];
            var circle = new Circle(shapeRenderer, planet.position.x,
                                    planet.position.y, planet.radius, tool
                                            .randomColor());
            circle.isRotating = planet.rotation;
            p[name] = circle;
            console.log('creating', name);
        }
        function attach(p) {
            for ( var name in p) {
                var parent = planets[name].parent;
                if (parent === undefined) continue;
                console.log('Attach ', name, 'to', parent);
                p[parent].appendChild(p[name]);
            }
        }
        attach(p);
        this.world.appendChild(p['sun']);
    };

    T_RIGIDBODY.prototype.run = function() {
        var that = this;
        var shapeRenderer = new ShapeRenderer();
        this.buildTree(shapeRenderer, planets);

        function loop() {
            that.renderer.step();
            setTimeout(loop, 1000 / 120);
        }
        loop();
    };

    T_RIGIDBODY.__namespace__ = 'graphit/test/unit/rigidbody';

    return new T_RIGIDBODY();
});
