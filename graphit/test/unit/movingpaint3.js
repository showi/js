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

    function log() {
        console.log.apply(console, arguments);
    }

    function MOUSE() {
        var size = util.windowSize();
        size.x = math.clamp(size.x, 100, 640);
        size.y = math.clamp(size.y, 100, 480);
        this.setUp(size, 0.8);
    }

    MOUSE.prototype.setUp = function(size, ratio) {
        this.numRectangle = 250;
        this.currentScreen = 0;
        this.size = size;
        this.ratio = 0.8;
        var width = 320;
        var height = 240;
        var dw = width / 2;
        var dh = height / 2;
        this.buffer = new DBuffer({
            width : this.size.x * this.ratio,
            height : this.size.y * this.ratio
        });
        this.numCol = 2;
        this.numScreen = 4;
        this.screen = [];

        for (var i = 0; i < this.numScreen/this.numCol; i++) {
            for (var j = 0; j < this.numCol; j++) {
                var screen = new DBuffer({
                    width : width,
                    height : height
                });
                screen.worldTransform = new Matrix33();
                screen.worldTransform.positionXY(-dw + i * (dw), -dh + j
                        * (dh))
                this.screen.push(screen);
            }
        }
        // this.canvas = this.buffer.front;
        // console.log('Canvas WxH', this.canvas.width(), this.canvas.height());
        // this.screenTransform = new Matrix33();
        // this.screenTransform.translateXY(this.canvas.width() / 2, this.canvas
        // .height() / 2);
        this.renderer = new Renderer({
            ctx : this.screen[0].back.getCtx(),
            compositing : {
            // globalAlpha : 0.8,
            },
        // worldTransform : this.screenTransform,
        });
        this.renderer.fixedUpdate = 66;
        this.renderer.fixedDraw = 30;
        this.timeout = 0;// this.renderer.fixedUpdate;
        this.renderer.limitUpdate = 2;
        // console.log('ScreenTransform', this.screenTransform.toString());
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

    function wSlider(id, min, max, fnSlide, fnChange) {
        if (id === undefined) {
            id = util.genUID();
        }
        var elm = jQuery('<div></div>');
        elm.id = id;
        elm.slider({
            value : 250,
            min : min,
            max : max,
            change : fnChange,
            slide : fnSlide,
            range : 'min',
            orientation : 'horizontal'
        });
        return elm;
    }

    MOUSE.prototype.createTree = function() {
        for (var i = 0; i < this.numRectangle; i++) {
            this.createNode();
        }
    };

    MOUSE.prototype.createNode = function() {
        var width = 320; // this.width * this.numCol;
        var height = 240;
        var dw = width / 2;
        var dh = height / 2;
        var mw = dw * this.ratio;
        var mh = dh * this.ratio;
        log('w/h', width, height, 'dw/dh', dw, dh, 'mw/mh', mw, mh);
        var node = new ShapeNode({
            kind : math.choice([eShape.rectangle, eShape.circle]),
            size : {
                width : Math.randInt(5, mw),
                height : Math.randInt(5, mh),
            },
            pos : {
                x : 0,// Math.randInt(-dw, dw),
                y : 0,// Math.randInt(-dh, dh),
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
        node.velocity.randomize().normalize().clamp(0.01, 0.1);
        // console.log('velocity', node.velocity);
        node.zindex = Math.randInt(0, 10);
        node.zindexInc = (Math.random() > 0.5) ? true : false;
        node.timeout = Date.now() + Math.randInt(0, 10000);
        this.renderer.root.appendChild(node);
    };

    MOUSE.prototype.setNumRectangle = function(value) {
        this.numRectangle = value;
        var root = this.renderer.root;
        while (root.child.length > value) {
            root.child.shift();
        }
        while (root.child.length < value) {
            this.createNode();
        }
    };

    MOUSE.prototype.createHTML = function() {
        this.body.empty();
        this.body.css({
            'background-color' : '#222'
        });
        var i, j, screen, row, elm;
        this.table = jQuery('<table class="graphit-container"></table>');
        for (i = 0; i < this.screen.length, screen = this.screen[i]; i++) {
            row = jQuery('<tr></tr>');
            for (j = 0; j < this.numCol; j++) {
                elm = jQuery('<td class="screen"></td>');
                elm.append(screen.front.getElement());
                row.append(elm);
            }
            this.table.append(row);
        }
        this.body.append(this.table);
        // var elm = jQuery(this.canvas.getElement());
        // this.body.append(elm);
        this.wRenderer = new WRenderer(this.renderer);
        this.wRenderer.build(this.body);
        var that = this;
        function updateNumElement(value) {
            that.setNumRectangle.call(that, that.wSlider.slider('value'));
        }
        this.wSlider = wSlider('numElement', 1, 1000, updateNumElement,
                               updateNumElement);
        this.wSlider.width(this.wRenderer.element.width());
        this.wRenderer.element.append(this.wSlider);
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
        var i;
        this.startMeasureLoop(1000);

        this.render_screen();

    };

    MOUSE.prototype.render_screen = function() {
        var that = this;
        this.currentScreen = 0;
        this.renderer.post_update = function(node) {
            ;
        };
        this.renderer.update = function(node, elapsed) {
            if (tree.hasCapability(node, eCap.transform)) {
                if (node.timeout < this.now) {
                    node.timeout = this.now + Math.randInt(1000, 10000);
                    if (node.zindexInc) {
                        if (node.zindex < 10) {
                            node.zindex++;
                        } else {
                            node.zindexInc = false;
                        }
                    }
                    if (!node.zindexInc) {
                        if (node.zindex > 0) {
                            node.zindex--;
                        } else {
                            node.zindexInc = true;
                        }
                    }
                }
                var p = node.transform.position();
                var v = node.velocity.clone().smul(elapsed);
                // console.log('elapsed', elapsed)
                var speed = node.orientation.clone().mul(v);
                p.add(speed);
                var w = (640 / 2) - (node.size.width / 2);
                var h = (480 / 2) - (node.size.height / 2);
                if (p.x < -w || p.x > w) {
                    node.orientation.inverseX();
                }
                if (p.y < -h || p.y > h) {
                    node.orientation.inverseY();
                }
                node.transform.translate(speed);
                node
                        .applyWorldTransform(that.screen[that.currentScreen].worldTransform);
            }
        };
        this.renderer.pre_render = function() {
            if (that.screen[that.currentScreen] === undefined) {
                return;
            }
            console.log(that.screen[that.currentScreen], that.currentScreen);
            this.ctx = that.screen[that.currentScreen].back.context.ctx;
        };

        this.renderer.post_render = function() {
            if (that.currentScreen < that.screen.length) {
                that.currentScreen++;
            } else {
                that.currentScreen = 0;
            }
        };
        this.renderer.draw_init = function() {
            that.screen[that.currentScreen].back.clear('black');
        };
        this.renderer.draw_end = function() {
            that.screen[that.currentScreen].back.flip();
        };
        function drawTick() {
            that.renderer.canDraw = true;
            setTimeout(drawTick, that.renderer.fixedDraw);
        }
        drawTick();
        function loop() {
            that.renderer.step();
            setTimeout(loop, that.timeout);
        }
        loop();
    };

    return new MOUSE();
});