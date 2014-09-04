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

    var DoubleBuffer = require('graphit/draw/doublebuffer');
    var Renderer = require('graphit/tree/renderer');
    var factory = require('graphit/tree/factory');
    var Node = require('graphit/tree/node/node');
    var tree = require('graphit/tree/util');
    var eCap = require('graphit/enum/capability');
    var util = require('graphit/util');
    var shape = require('graphit/draw/shape');
    var ShapeElm = require('graphit/tree/node/shape');
    var eShape = require('graphit/enum/shape');
    var draw = require('graphit/draw/tool');

    function SELECT() {
        this.__namespace__ = 'graphit/test/unit/select';
    }

    function genLine(obj) {
        var max = Math.max(obj.width, obj.height);
        var size = Math.randInt(0, max);
        var line = new ShapeElm({kind: eShape.line, 
            size: size});
        console.log('Line created');
        line.strokeStyle = draw.randomColor();
        line.fillStyle = draw.randomColor();
        return line;
    }
    function genRectangle(obj) {
        var max = Math.max(obj.width, obj.height);
        var size = Math.randInt(0, max);
        var rectangle = new ShapeElm({kind: eShape.rectangle, 
            size: {x: Math.randInt(0, obj.width), y: Math.randInt(0, obj.height)}});
        rectangle.strokeStyle = draw.randomColor();
        rectangle.fillStyle = draw.randomColor();
        rectangle.positionX(Math.randInt(0, obj.width));
        rectangle.positionY(Math.randInt(0, obj.height));
        return rectangle;
    }    
    SELECT.prototype.run = function() {
        var test = this;
        this.setUp();
        var root = new Node(); //factory.node(Node);
        console.log('root created')
        for (var i = 0; i < 100; i++) {
            root.appendChild(genLine(this));
            root.appendChild(genRectangle(this));
        }
        root.render = function(renderer) {
            renderer.ctx.fillStyle = 'red';
            shape.rectangle(renderer.ctx, 100, 100, 200, 200, 0, 0);
        };
        var renderer = new Renderer({
            root : root,
            ctx : test.buffer.back.getCtx(),
            compositing : {
                globalAlpha : 0.1,
                globalCompositionOperation : 'source-over',
            },
        });
        console.log(renderer);
        renderer.ctx.translate(this.width / 2, this.height / 2);
        var that = this;
        renderer.renderInit = function(renderer) {
            test.buffer.clearBackBuffer();
        };
        renderer.render = function(node) {
            if (tree.hasCapability(node, eCap.draw)) {
                node.draw(renderer);
            }
        };
        renderer.renderEnd = function() {
            test.buffer.flip();
        };
        function loop() {
            renderer.step();
            setTimeout(loop, 10);
        }
        loop();
    };

    SELECT.prototype.setUp = function() {
        this.width = 800;
        this.height = 600;
        this.body = jQuery('body');
        this.body.empty();
        this.buffer = new DoubleBuffer({width: this.width, 
                                        height: this.height});
        console.log('dbuffer created');
        if (this.element !== undefined) {
            this.element.remove();
        }
        this.element = jQuery(this.buffer.getElement());
        this.element.append('<div class="graphit-error unsuported">CANVAS NOT SUPPORTED</div>');
        this.body.append(this.element);
        this.body.append('Testing select!');
    };

    return new SELECT();
});
