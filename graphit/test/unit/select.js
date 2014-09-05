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
        line.strokeStyle = draw.randomColor();
        line.fillStyle = draw.randomColor();
        return line;
    }

    function genRectangle(obj) {
        var max = Math.max(obj.width, obj.height);
        var size = Math.randInt(0, max);
        var rectangle = new ShapeElm({
            kind: eShape.rectangle, 
            size: {
                    width: Math.randInt(0, obj.width), 
                    height: Math.randInt(0, obj.height)
            },
        });
        rectangle.strokeStyle = draw.randomColor();
        rectangle.fillStyle = 'red'; //draw.randomColor();
        var dW = obj.width / 2;
        var dH = obj.height / 2;
//        rectangle.positionX(Math.randInt(0, obj.width));
//        rectangle.positionY(Math.randInt(0, obj.height));
        return rectangle;
    }

    SELECT.prototype.run = function() {
        var test = this;
        this.setUp();
        var root = new Node({traversable: true}); //factory.node(Node);
        for (var i = 0; i < 1; i++) {
//            root.appendChild(genLine(this));
            root.appendChild(genRectangle(this));
        }
        console.log('count', root.child.length);
        var renderer = new Renderer({
            root : root,
            ctx : test.buffer.back.getCtx(),
            compositing : {
                globalAlpha : 0.5,
                globalCompositionOperation : 'source-over',
            },
        });
        var that = this;
        var count = 0;
        renderer.pre_render = function() {
            test.buffer.clearBackBuffer('white');
        };

        renderer.render = function(node) {
            if (tree.hasCapability(node, eCap.draw)) {
//                console.log('drawing', node)
                node.draw(this);
            }
        };
        renderer.post_render = function(r) {
            renderer.ctx.translate(that.width / 2, that.height / 2);
            test.buffer.flip();
            if (this.measureEnd()) {
                this.measureStart();
            }
        };
        function updateWidget() {
            function l() { 
                console.log.apply(console, arguments);
            }
            function inner() {
                console.log('*----- --- -----*');
                console.log(' - count   :', count);
                console.log(' - fps     :', renderer.fps());
                console.log(' - ups     :', renderer.ups());
                console.log(' - renderer:', renderer);
            }
            setTimeout(inner, 1000);
        }
        updateWidget.call(this);
        function loop() {
            renderer.step();
            setTimeout(loop, 10);
        }
        this.renderer = renderer;
        renderer.measureStart();
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
//        if (this.element !== undefined) {
//            this.element.remove();
//        }
        this.element = jQuery(this.buffer.getElement());
        //this.element.append('<div class="graphit-error unsuported">CANVAS NOT SUPPORTED</div>');
        this.body.append(this.element);
        this.body.append('Testing select!');
    };

    return new SELECT();
});
