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

    var Point = require('graphit/geom/point2d');
    var Circle = require('graphit/geom/circle2d');
    var BondCircle = require('graphit/bond/circle2d');
    var Canvas = require('graphit/draw/canvas');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    var math = require('graphit/math');
    var util = require('graphit/util');
    var Renderer = require('graphit/renderer');
    var RenderableMixin = require('graphit/scene/mixin/renderable');
    var Node = require('graphit/scene/node/node');
    var eCap = require('graphit/enum/capability');
    var scene = require('graphit/scene/util');

    require('graphit/extend/jquery');

    function BCircle() {
        Circle.apply(this, arguments);
        this.bound = new BondCircle(this, arguments[3]);

    }
    BCircle.prototype = Object.create(Circle.prototype);
    RenderableMixin.call(BCircle.prototype);
    var data = {
        sun : {
            radius : 696342,
            color : 'yellow',
            position : [0, 0],
        },
        earth : {
            radius : 6378.137 * 10,
            color : 'blue',
            position : [149600000, 0]
        }
    };

    function GEOM2D() {
        this.__namespace__ = 'graphit/test/geom2d';
        this.numPoint = 1000;
    }

    GEOM2D.prototype.run = function() {
        this.setUp();
        var render = this.render;
        var count = 3;
        function loop() {
            render.step();
            if (count > 0) {
                count--;
                setTimeout(loop, 33);
            }
        }
        loop();
    };

    GEOM2D.prototype.setUp = function() {
        var size = util.windowSize();
        var width = 600; //size.x;
        var height = 400; //size.y;
        var dw = width / 2;
        var dh = height / 2;
        this.width = width;
        this.height = height;
        this.dw = dw;
        this.dh = dh;
        this.circle = [];
        this.point = [];
        var worldMat = new Matrix33();
        worldMat.translateXY(width, dh);
        this.worldMat = worldMat;
        var point, circle;

        var canvas = new Canvas({
            width : width,
            height : height,
        });
        console.log('Creating canvas', canvas, 'w/h', width, height);
        this.canvas = canvas;
        var body = jQuery('body');
        body.css({
            'background-color' : 'grey',
        });
        body.append(canvas.element);
        body.center();
        this.body = body;
        this.numCircle = 0;
        var root = new Node();
        this.root = root;
        console.log('rand', math.randInt(-height, height));
        for (var i = 0; i < this.numCircle; i++) {
            var circle = genCircle(math.randInt(-dw, dw), math
                    .randInt(-dh, dh), {
                color : 'red'
            });
            root.appendChild(circle);
        }
        root.appendChild(genCircle(0, 0, {fillStyle: 'white'}));
        root.appendChild(genCircle(0, -40, {fillStyle:'green'}));
        root.appendChild(genCircle(40, 0, {fillStyle:'blue'}));
        root.appendChild(genCircle(-40, 0, {fillStyle:'red'}));
        root.appendChild(genCircle(0, 40, {fillStyle:'yellow'}));

        console.log(canvas.getCtx());
        this.worldTransform = new Matrix33();
        this.worldTransform.positionXY(dw, dh);
        this.render = new Renderer({
            root : root,
            ctx : canvas.getCtx(),
            canDraw : true,
            worldTransform : this.worldTransform,
        });
        OurRenderer.call(this.render, this);

    };
    function genCircle(x, y, opts) {
        var circle = new BCircle(x, y, 20);
        circle.fillStyle = 'white';
        if (opts !== undefined) {
            if (opts.fillStyle !== undefined) {
                circle.fillStyle = opts.fillStyle;
            }
        }
        return circle;
    }
    function OurRenderer(parent) {
        console.log('Patching renderer with our function');
        var test = parent;
        this.draw_init = function() {
            this.ctx.save();
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, test.width, test.height);
            this.ctx.restore();
        }
        this.pre_update = function(node) {
            // console.log('pre_update', node);
            if (scene.hasCapability(node, eCap.render)) {
                // console.log(node);
            }
        };
        this.render = function(node) {
            console.log('Rendering node');
            node.draw(this.ctx);
            // this.ctx.fillRect(-10, -50, 100, 100);
        }
    }
    return new GEOM2D();
});
