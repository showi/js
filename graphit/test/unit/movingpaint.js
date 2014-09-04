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

    var Primitive = require('graphit/tree/node/primitive');
    var Node = require('graphit/tree/node/node');
    var TransMixin = require('graphit/tree/mixin/transform');
    var DoubleBuffer = require('graphit/draw/doublebuffer');
    var Line = require('graphit/math/line');
    var util = require('graphit/util');
    var tool = require('graphit/draw/tool');
    var factory = require('graphit/factory');
    var Renderer = require('graphit/tree/renderer');
    var eCap = require('graphit/enum/capability');
    var tutil = require('graphit/tree/util');
    var Point2d = require('graphit/math/point2d');
    require('graphit/extend/jquery');

    var minWidth = 0.1;
    var maxWidth = 5;

    var WidgetFps = jQuery(
                           '<div class="graphit-widget">fps:<div class="value"></div></div>')
            .draggable();
    var WidgetUps = jQuery(
                           '<div class="graphit-widget">ups:<div class="value"></div></div>')
            .draggable();
    function TREE() {
        this.__namespace__ = 'graphit/test/movingpaint';
    }

    function genLine(width, height) {
        var max = Math.max(width, height);
        function randInt(m) {
            return Math.randInt(0, m);
        }
        function randPoint() {
            return new Point2d(randInt(width), randInt(height));
        }
        var line = new Line(randPoint(), randPoint());
        line.fillStyle = tool.randomColor();
        line.strokeStyle = tool.randomColor();
        line.lineWidth = Math.randFloat(1.0, 10.0);
        line.lineCap = util.choice(['butt', 'round', 'squared']);
        line.lineJoin = util.choice(['bevel', 'round', 'miter']);
        return line;
    }

    function mutePrimitive(node, width, height, delta) {
        if (delta == 0) {
            delta = 0.001;
        }
        var max = Math.max(width, height);
        var step = 0.25;
        function randValue(value, s) {
            if (s === undefined) {
                s = step;
            }
            s = s * delta;
            var sign = true;
            if (Math.random() > 0.5) {
                sign = false;
            }
            var add = Math.randFloat(0.0, s);
            if (value + add > max) { return value - add; }
            if (!sign) { return value - add; };
            return value + add;
        }
        var nl = [];
        for (var i = 0; i < node.primitive.length; i++) {
            var p = node.primitive[i];
            p.lineWidth = randValue(p.lineWidth, 0.01);
            if (p.lineWidth > maxWidth || p.lineWidth < minWidth) {
                p = genLine(width, height);
            }
            if (p instanceof Line) {
                p.a.x = randValue(p.a.x);
                p.a.y = randValue(p.a.y);
                p.b.x = randValue(p.b.x);
                p.b.y = randValue(p.b.y);
            }
            nl.push(p);
        }
        node.primitive = nl;
    };

    function muteNode(node, width, height, delta) {
        // console.log('delta', delta);
        if (node instanceof Primitive) {
            mutePrimitive(node, width, height, delta);
        }
        // prevNode = node;

    }

    TREE.prototype.run = function() {
        console.log('----- MovingPaint -----');
        var timeout = 1000 / 120;
        var numPrimitive = 256;
        var size = util.documentSize();
        size.x = Math.min(800, size.x);
        size.y = Math.min(600, size.y);
        var scale = 0.80;
        var width = size.x * scale;
        var height = size.y * scale;
        var buffer = new DoubleBuffer({
            width : width,
            height : width
        });
        var canvas = buffer.front;
        var body = jQuery('body');
        body.append(WidgetFps);
        body.append(WidgetUps);
        var container = jQuery('<div class="graphit-test"></div>');
        var elm = buffer.front.getElement();
        container.width(width).height(height).center();
        container.append(elm);
        body.append(container);
        var pool = [];
        var root = factory.tree.node(Node, {
            pool : pool
        });
        var prim = factory.tree.node(Primitive, {
            pool : pool
        });
        for (var i = 0; i < numPrimitive; i++) {
            prim.addPrimitive(genLine(width, height));
        }
        root.appendChild(prim);
        var renderer = new Renderer({
            root : root,
            ctx : buffer.back.getCtx(),
            compositing : {
                globalAlpha : 1.0,
                globalCompositionOperation : 'source-over',
            },
        });
        this.renderer = renderer;
        function updateFpsWidget() {
            WidgetFps.find('.value')
                    .text(Math.round(this.getFps() * 100) / 100);
            WidgetUps.find('.value')
                    .text(Math.round(this.getUps() * 100) / 100);
        };
        function updateDisplay() {
            updateFpsWidget.call(renderer);
            setTimeout(updateDisplay, 1000);
        }
        updateDisplay();
        renderer.update = function(node) {
            muteNode(node, width, height, this.delta);
        };
        renderer.pre_render = function(node) {
            buffer.clearBackBuffer();
        };
        renderer.render = function(node) {
            if (tutil.hasCapability(node, eCap.draw)) {
                node.draw(this);
            }
        };
        renderer.post_render = function(node) {
            buffer.flip();
        };
        function loop() {
            renderer.step.call(renderer);
            setTimeout(loop, timeout);
        }
        loop();
    };
    return new TREE();
});
