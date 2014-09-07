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
    var WRenderer = require('graphit/widget/renderer');
    var math = require('graphit/math');

    require('graphit/extend/jquery');

    function MOUSE() {
        var size = util.windowSize();
        size.x = math.clamp(size.x, 100, 800);
        size.y = math.clamp(size.y, 100, 600);
        this.setUp(size, 0.8);
    }

    MOUSE.prototype.setUp = function(size, ratio) {
        this.numRectangle = 10;
        this.size = size;
        this.ratio = 1;
        this.buffer = new DBuffer({
            width : this.size.x * this.ratio,
            height : this.size.y * this.ratio
        });
        this.canvas = this.buffer.front;
        console.log('Canvas WxH', this.canvas.width(), this.canvas.height());

//        this.renderer.fixedUpdate = 10;
//        this.renderer.fixedDraw = 20;
//        this.timeout = 3;
        this.screenTransform = new Matrix33();
        this.screenTransform.translateXY(this.canvas.width() / 2, this.canvas
                .height() / 2);
        this.renderer = new Renderer({
            ctx : this.buffer.back.getCtx(),
            compositing : {
                globalAlpha : 1.0,
            },
            worldTransform: this.screenTransform,
        });
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
        for (var i = 0; i < this.numRectangle; i++) {
            this.renderer.root.appendChild(this.createNode());
        }
    };

    MOUSE.prototype.createNode = function(root) {
        var subchild = false;
        var width = this.canvas.width();
        var height = this.canvas.height();
        var pos = new Vector2d(0, 0);
        if (root === undefined) {
            root = this.renderer.root;
        } else {
            subchild = true;
            width = root.size.width;
            height = root.size.height;
            pos = root.position();
        }
        var dw = width / 2;
        var dh = height / 2;
        dw = math.clamp(dw, 0, dw);
        dh = math.clamp(dh, 0, dh);
        // console.log('dw/dh', dw, dh);
        var mw = dw * this.ratio;
        var mh = dh * this.ratio;
        // console.log('mw/mh', mw, mh);
        var node = new ShapeNode({
            kind : eShape.rectangle,
            size : {
                width : Math.randFloat(1, mw),
                height : Math.randFloat(1, mh)
            },
            pos : {
                x : Math.randFloat(-dw, dw),
                y : Math.randFloat(-dh, dh)
            },

        });
        node.fillStyle = tool.randomColor();
        node.strokeStyle = tool.randomColor();
        node.orientation = new Vector2d();
        node.orientation.randomize().normalize();
        if (Math.random() > 0.5) {
            node.orientation.inverseX();
        }
        if (Math.random() > 0.5) {
            node.orientation.inverseY();
        }
        node.velocity = new Vector2d(0, 0);
        if (!subchild) {
            node.velocity.randomize().smul(Math.randFloat(1.0, 10.0));
            var count = Math.randInt(1, 10);
            for (var i = 0; i < count; i++) {
                var n = this.createNode(node);
                node.appendChild(n);
            }
        } else {
            node.velocity.copy(root.velocity).smul(0.1);
        }
        return node;
    };

    MOUSE.prototype.createHTML = function() {
        this.body.empty();
        this.body.css({
            'background-color' : '#222'
        });
        var elm = jQuery(this.canvas.getElement());
        this.body.append(elm);
        this.wRenderer = new WRenderer(this.renderer);
        this.wRenderer.build(this.body);
        elm.center();
    };

    MOUSE.prototype.startMeasureLoop = function(timeout) {
        var that = this;
        if (this._measureLoop !== undefined) {
            console.error('measure alreayd started');
            return false;
        }
        this._measureLoop = true;
        function loop() {
            if (!that._measureLoop) { return; }
            if (that.renderer.measureEnd()) {
                //                console.log('Measure End/start');
                that.wRenderer.update();
                that.renderer.measureStart();
            }
            setTimeout(loop, timeout);
        }
        loop();
        return true;
    };

    MOUSE.prototype.stopMeasureLoop = function() {
        if (this._measureLoop === undefined) {
            console.error('Measure not started');
            return false;
        }
        this._measureLoop = undefined;
        return true;
    };

    MOUSE.prototype.run = function() {
        var that = this;
        this.startMeasureLoop(100);
        this.renderer.update = function(node) {
            if (tree.hasCapability(node, eCap.transform)) {
                var p = node.transform.position();
                var speed = node.orientation.clone().mul(node.velocity);
                p.add(speed);
                var pw = that.canvas.width() / 2;   
                var ph = that.canvas.height() / 2;
                if (node.parent && node.parent.size) {
//                    console.log('parent size', node.parent.size);
                    pw =  (node.parent.size.width / 2); 
                    ph =  (node.parent.size.height / 2);
                }
                var w = pw - (node.size.width / 2);;
                var h = ph - (node.size.height / 2);;
//                console.log('w/h', w, h);
                if (p.x < -w || p.x > w) {
                    node.orientation.inverseX();
                }
                if (p.y < -h || p.y > h) {
                    node.orientation.inverseY();
                }
                node.transform.translate(speed);
                };
        };
        this.renderer.draw_init = function() {
            that.buffer.back.clear('white');
            this.ctx.translate(that.width / 2, this.height / 2);
        };
        this.renderer.render = function(node) {
            node.draw(this);
        };
        this.renderer.draw_end = function() {
            that.buffer.flip();
        };
        function loop() {
            that.renderer.step();
            setTimeout(loop, that.timeout);
        }
        loop();
    };

    return new MOUSE();
});
