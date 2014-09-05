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
    var ShapeNode = require('graphit/tree/node/shape');
    var eShape = require('graphit/enum/shape');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');

    require('graphit/extend/jquery');

    function MOUSE() {

    }
    function htmlToolbar() {
        var root = jQuery('<div class="graphit-toolbar"></div>');
        var colorPicker = jQuery('<div class="color-picker>"' +
              '<div>Fill<value class="fillStyle" type="text" /></div>' +
              '<div>stroke<value class="strokeStyle" type="text" /></div>' +
        '</div>');
        root.append(colorPicker);
        return root;
        
    }

    MOUSE.prototype.run = function() {
        var worldTransform = new Matrix33();
        var body = jQuery('body');
        var toolBar = htmlToolbar();
        body.append(toolBar);
        body.css({
            'background-color' : '#222'
        });
        body.empty();
        var size = util.windowSize();
        var ratio = 0.8;
        var canvas = new Canvas({
            width : size.x * ratio,
            height : size.y * ratio
        });
        worldTransform.translate(canvas.width()/2, canvas.height()/2);
        canvas.clear('white');
        var ctx = canvas.getCtx();
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'white';
        var elm = canvas.getElement();
        shape.rectangle(ctx, 0, 0, canvas.width(), canvas.height());
        body.append(elm);
        jQuery(elm).center();
        var mouse = new Mouse();
        var nodeList = [];
        mouse.registerMouseMove(elm);
        mouse.registerMouseUpDown(elm, function(event) {
            mouse.recordEnd.call(mouse);
            var node = new ShapeNode({
                kind: eShape.rectangle, 
                size: {
                    width: 100,
                    height: 100,
                }
            });
            ctx.save();
            console.log('event', event);
            node.translateXY(event.x, event.y);
            console.log('translate', node.transform);
            node.applyWorldTransform(worldTransform);
            ctx.transform(0,0,0,0, 
                          worldTransform.positionX(), 
                          worldTransform.positionY());
            console.log('WorldTranform', worldTransform);
            node.fillStyle = 'blue';
            node.draw(canvas.context);
            ctx.restore();
            nodeList.push(node);
        }, function(event) {
            mouse.recordStart.call(mouse);
        }, function(event) {

            mouse.iterRecord.call(this, function(record) {
                var size = 30;
                shape.circle(ctx, record.pos.x, record.pos.y, size--);
//                size--;
            }, 20, true);
        });
        this.mouse = mouse;
        //body.append('<div><h2>Click Me!</h2></div>');
    };

    return new MOUSE();
});
