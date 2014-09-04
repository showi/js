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

    function randValue(max, value, step) {
        var sign = true;
        if (Math.random() > 0.5) {
            sign = false;
        }
        var add = Math.randFloat(0.0, step);
        if (value + add > max) { return value - add; }
        if (!sign) { return value - add; };
        return value + add;
    }

    function mutePrimitive(node, width, height, delta) {
        var max = Math.max(width, height);
        var step = 0.125 * delta;
        var nl = [];
        for (var i = 0; i < node.primitive.length; i++) {
            var p = node.primitive[i];
            p.lineWidth = randValue(max, p.lineWidth, 0.025 * delta);
            if (p.lineWidth > maxWidth || p.lineWidth < minWidth) {
                p = genLine(width, height);
            }
            if (p instanceof Line) {
                p.a.x = randValue(max, p.a.x, step);
                p.a.y = randValue(max, p.a.y, step);
                p.b.x = randValue(max, p.b.x, step);
                p.b.y = randValue(max, p.b.y, step);
            }
            nl.push(p);
        }
        node.primitive = nl;
    };

    function muteNode(node, width, height, delta) {
        if (node instanceof Primitive) {
            mutePrimitive(node, width, height, delta);
        }
    }

    TREE.prototype.run = function() {
        var that = this;
        console.log('----- MovingPaint -----');
        this.timeout = Math.round(1000/66);
        var numPrimitive = 128;
        var size = util.documentSize();
        size.x = Math.min(640, size.x);
        size.y = Math.min(480, size.y);
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
        function updateWidget() {
            var wFps = WidgetFps.find('.value');
            var wUps = WidgetUps.find('.value');
            var that = this;
            function inner() {
                wFps.text(Math.round(that.getFps() * 100) / 100);
                wUps.text(Math.round(that.getUps() * 100) / 100);
                setTimeout(inner, 666);
            };
            inner.call(this);
        };
        updateWidget.call(renderer);
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
            setTimeout(loop, that.timeout);
        }
        loop.call(this);
    };
    

    return new TREE();
});
