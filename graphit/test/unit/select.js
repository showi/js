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
        rectangle.fillStyle = draw.randomColor();
        rectangle.positionX(Math.randInt(0, obj.width));
        rectangle.positionY(Math.randInt(0, obj.height));
        return rectangle;
    }    
    SELECT.prototype.run = function() {
        var test = this;
        this.setUp();
        var root = new Node({traversable: true}); //factory.node(Node);
        for (var i = 0; i < 100; i++) {
//            root.appendChild(genLine(this));
            root.appendChild(genRectangle(this));
        }

        var renderer = new Renderer({
            root : root,
            ctx : test.buffer.back.getCtx(),
            compositing : {
                globalAlpha : 0.1,
                globalCompositionOperation : 'source-over',
            },
        });
        var that = this;
        renderer.ctx.translate(this.width / 2, this.height / 2);
        var count = 0;
        renderer.pre_render = function() {
            test.buffer.clearBackBuffer();
            this.ctx.fillStyle = 'red';
            count = 0;
        };

        renderer.render = function(node) {
            count++;
            if (tree.hasCapability(node, eCap.draw)) {
//                console.log('drawing', node)
                node.draw(this);
            }
        };
        renderer.post_render = function() {
            test.buffer.flip();
        };
        function updateWidget() {
            function l() { 
                console.log.apply(console, arguments);
            }
            function inner() {
                l('*----- --- -----*');
                l(' - count   :', count);
                l(' - fps     :', renderer.getFps());
                l(' - ups     :', renderer.getUps());
                l(' - renderer:', renderer);
            }
            setTimeout(inner, 1000);
        }
        updateWidget.call(this);
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
