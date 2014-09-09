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
    var Canvas = require('graphit/draw/canvas');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    var math = require('graphit/math');

    function GEOM2D() {
        this.__namespace__ = 'graphit/test/geom2d';
        this.numPoint = 1000;
    }

    GEOM2D.prototype.run = function() {
        this.setUp();
        var ctx = this.canvas.getCtx();
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
        var trans = this.worldMat;
        ctx.strokeStyle = 'white';
        ctx.save();
        for (var i = 0; i < this.numPoint; i++) {
            ctx.save();
            this.drawPoint(ctx, math.randInt(-this.dw, this.dw),
                                math.randInt(-this.dh, this.dh));
            ctx.stroke();
            ctx.restore();
        }
        ctx.strokeStyle = 'red';
        this.drawPoint(ctx, 100, 100);
        ctx.stroke();
        ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                      trans._data[4], trans._data[2], trans._data[5]);
        ctx.restore();
    };

    GEOM2D.prototype.drawPoint = function(ctx, x, y) {
        var trans;
        var point = new Point(x, y);
        point.applyWorldTransform(this.worldMat);
        trans = point.worldTransform;
        ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                      trans._data[4], trans._data[2], trans._data[5]);
        point.draw(ctx);
    };

    GEOM2D.prototype.draw = function(ctx) {
        var i, circle;
        var dw = this.width / 2;
        var dh = this.height / 2;
        console.log('dw/dh', dw, dh);
        var trans;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
        // for (i = 0; i < this.circle.length; i++) {
        // circle = this.circle[i];
        // trans = circle.worldTransform;
        // console.log('WT', trans, circle);
        // ctx.save();
        // ctx.transform(trans._data[0], trans._data[1], trans._data[3],
        // trans._data[4], trans._data[2], trans._data[5]);
        // ctx.fillStyle = 'red';
        // circle.draw(ctx);
        // ctx.fill();
        // ctx.restore();
        // }
        var point;
        for (i = 0; i < this.point.length; i++) {
            point = this.point[i];
            trans = point.worldTransform;
            ctx.save();

            ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                          trans._data[4], trans._data[2], trans._data[5]);
            ctx.fillStyle = 'black';
            point.draw(ctx);
            ctx.fill();
            ctx.restore();
        }
    };

    GEOM2D.prototype.setUp = function() {
        var width = 640;
        var height = 480;
        var dw = width / 2;
        var dh = height / 2;
        this.width = width;
        this.height = height;
        this.dw = dw;
        this.dh = dh;
        this.circle = [];
        this.point = [];
        var worldMat = new Matrix33();
        worldMat.translateXY(dw, dh);
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
        this.body = body;
    };

    return new GEOM2D();
});
