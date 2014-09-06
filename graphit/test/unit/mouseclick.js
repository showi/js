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

    var Mouse = require('graphit/mouse');
    var util = require('graphit/util');
    var eMath = require('graphit/enum/math');
    var Canvas = require('graphit/draw/canvas');
    var shape = require('graphit/draw/shape');
    var tool = require('graphit/draw/tool');
    var ShapeNode = require('graphit/tree/node/shape');
    var eShape = require('graphit/enum/shape');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');
    var eCtx = require('graphit/enum/context');
    var eCap = require('graphit/enum/capability');
    var Renderer = require('graphit/renderer/renderer');
    var tree = require('graphit/tree/util');
    var DBuffer = require('graphit/draw/doublebuffer');

    require('graphit/extend/jquery');

    function MOUSE() {
        this.setUp(util.windowSize(), 0.8);
    }

    MOUSE.prototype.setUp = function(size, ratio) {
        this.size = size;
        this.ratio = 0.8;
        this.buffer = new DBuffer({
            width : this.size.x * this.ratio,
            height : this.size.y * this.ratio
        });
        this.canvas = this.buffer.front;
        console.log('Canvas WxH', this.canvas.width(), this.canvas.height());
        this.renderer = new Renderer({
            ctx : this.buffer.back.getCtx(),
        });
        this.screenTransform = new Matrix33();
        this.screenTransform.translateXY(this.canvas.width() / 2, this.canvas
                .height() / 2);
        console.log('ScreenTransform', this.screenTransform.toString());
        this.body = jQuery('body');
        this.createHTML();
        this.createTree();
    };

    function htmlToolbar() {
        var root = jQuery('<div class="graphit-toolbar"></div>');
        var colorPicker = jQuery('<div class="color-picker>"'
                + '<div>Fill<value class="fillStyle" type="text" /></div>'
                + '<div>stroke<value class="strokeStyle" type="text" /></div>'
                + '</div>');
        root.append(colorPicker);
        return root;

    }

    MOUSE.prototype.createTree = function() {
        for (var i = 0; i < 1000; i++) {
            this.createNode();
        }
    };

    MOUSE.prototype.createNode = function() {
        var width = this.canvas.width();
        var height = this.canvas.height();
        var dw = width / 2;
        var dh = height / 2;
        // console.log('dw/dh', dw, dh);
        var mw = dw * this.ratio;
        var mh = dh * this.ratio;
        // console.log('mw/mh', mw, mh);
        var node = new ShapeNode({
            kind : eShape.rectangle,
            size : {
                width : Math.randInt(5, mw),
                height : Math.randInt(5, mh)
            },
            pos : {
                x : Math.randInt(-width, width),
                y : Math.randInt(-height, height)
            },

        });
        node.fillStyle = tool.randomColor();
        node.strokeStyle = tool.randomColor();
        node.orientation = new Vector2d();
        node.orientation.randomize().normalize().smul(Math.randFloat(0.1, 5));
//        console.log('orientation', node.uid, node.orientation.toString());
        this.renderer.root.appendChild(node);
    };

    MOUSE.prototype.createHTML = function() {
        this.body.empty();
        this.body.css({
            'background-color' : '#222'
        });
        this.body.append(this.canvas.getElement());
    };

    MOUSE.prototype.run = function() {
        var that = this;
        this.renderer.post_update = function(node) {
            if (!tree.hasCapability(node, eCap.render)) {
                return;
            }
//            if (Math.randInt(0, 10) > 1) {
//                tree.setCapability(node, eCap.draw);
//            } else {
//                tree.unsetCapability(node, eCap.draw);
//            }
        };
        this.renderer.update = function(node) {
            if (tree.hasCapability(node, eCap.transform)) {
                var p = node.transform.position();
                var step = 0.1 * this.delta;
                var o = node.orientation.clone().smul(step);
                p.add(o);//.clamp(0.001, 1.0);
                var w = that.canvas.width() / 2;
                var h = that.canvas.height() /2;
                var x = 0;
                var y = 0;
                if (p.x > w || p.x < -w) {
                    node.orientation.x = -node.orientation.x; //inverse();
                }
                if (p.y > h || p.y < -h) {
                    node.orientation.y = -node.orientation.y;
                }
//                node.orientation.normalize();
//                o = node.orientation.clone().normalize().smul(step);
//                p.add(o);
                node.transform.translate(o);
//                console.log('translate', o.x, o.y, p.x, p.y);
                node.applyWorldTransform(that.screenTransform);
//                this.ctx.translate(m.positionX(), m.positionY());
            }
        };
        this.renderer.draw_init = function() {
            that.buffer.back.clear('white');
        };
        this.renderer.render = function(node) {
//            if (tree.hasCapability(node, eCap.transform)) {
//                var m = node.applyWorldTransform(that.screenTransform);
//                 this.ctx.translate(m.positionX(), m.positionY());
//            } else {
//                console.log('render no transform', node);
//            }
            node.draw(this);
        };
        this.renderer.draw_end = function() {
            that.buffer.flip();
        };
        var that = this;
        function loop() {
            that.renderer.step();
            setTimeout(loop, 1000/60);
        }
        loop();
    };

    MOUSE.prototype._OLD = function() {
        canvas.clear('white');
        var ctx = canvas.getCtx();
        ctx.translate(dW, dH);
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'blue';
        var elm = canvas.getElement();
        shape
                .rectangle(ctx, -dW, -dH, canvas.width() / 2,
                           canvas.height() / 2);
        body.append(elm);
        jQuery(elm).center();
        var mouse = new Mouse();
        var nodeList = [];
        var renderer = {
            ctx : ctx,
            wt : worldTransform,
            st : screenTransform
        };
        mouse.registerMouseMove(elm);
        mouse.registerMouseUpDown(elm, function(event) {
            mouse.recordEnd.call(mouse);
            var node = new ShapeNode({
                kind : eShape.rectangle,
                size : {
                    width : 100,
                    height : 100,
                }
            });
            // ctx.save();
            // console.log('event', event);
            // node.positionXY(event.x, event.y);
            // console.log('translate', node.transform);
            // // node.applyWorldTransform(worldTransform);
            // console.log('node pos', node.positionX(), node.positionY());
            // // ctx.setTransform(0,0,0,0,
            // // node.positionX(),
            // // node.positionY());
            // console.log('WorldTranform', node.transform.toString());
            // node.fillStyle = 'blue';
            // node.draw(canvas.context);
            // ctx.fill();
            // ctx.restore();
            var mousePosition = new Vector2d(event.x, event.y);
            // mousePosition = screenTransform.vMul(mousePosition);
            var mpT = new Matrix33();
            mpT.position(mousePosition);
            mpT.mul(screenTransform);
            node.positionXY(mpT.positionX(), mpT.positionY());
            console.log('Mouse', mpT.positionX(), mpT.positionY());
            node.fillStyle = tool.randomColor();
            node.strokeStyle = 'blue';
            drawNode(renderer, node);
            nodeList.push(node);
        }, function(event) {
            mouse.recordStart.call(mouse);
        }, function(event) {

            mouse.iterRecord.call(this, function(record) {
                var size = 30;
                var v = screenTransform.vMul(record.pos);
                console.log('r', v.toString());
                shape.circle(ctx, v.x, v.y, size--);
                // size--;
            }, 20, true);
        });
        this.mouse = mouse;
        // body.append('<div><h2>Click Me!</h2></div>');
    };
    function drawNode(renderer, node) {
        renderer.ctx.save();
        var key = null;
        for (var i = 0; i < eCtx._keys; i++) {
            key = eCtx._keys[i];
            if (key in node) {
                renderer.ctx[key] = node[key];
            }
        }
        // node.applyWorldTransform(renderer.st);
        var wt = node.getWorldTransform();
        console.log(node.transform, node);
        var pos = node.transform.position();
        console.log('Node', node.toString());
        var wt = node.applyWorldTransform(renderer.st);
        var pos = wt.position();
        // var posX = wt.positionX();
        // var posY = wt.positionY();
        console.log('pos', pos.toString());
        // renderer.ctx.translate(pos.x, pos.y);
        node.draw(renderer);
        renderer.ctx.restore();
    }
    return new MOUSE();
});
