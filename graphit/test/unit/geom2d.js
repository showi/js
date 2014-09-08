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

    function GEOM2D() {
        this.__namespace__ = 'graphit/test/geom2d';
        this.numPoint = 100;
    }

    GEOM2D.prototype.run = function() {
        this.setUp();
        this.draw(this.canvas.getCtx());
    };

    GEOM2D.prototype.draw = function(ctx) {
        var i, circle;
        var dw = this.width / 2;
        var dh = this.height / 2;
//        var vSize = new Vector2d(this.width, this.height);
//        vSize = this.worldMat.vMul(vSize);
//        dw = vSize.x;
//        dh = vSize.y;
        console.log('dw/dh', dw, dh);
        var trans;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);
        for (i = 0; i < this.circle.length; i++) {
            circle = this.circle[i];
//            circle.scale(Math.randFloat(0.1, 10.0));
//            circle.positionXY(Math.randFloat(-dw, dw), Math.randFloat(-dh, dh));
            trans = this.worldMat.clone();
            trans.mul(circle.transform);
            ctx.save();
            ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                             trans._data[4], trans._data[2], trans._data[5]);
            ctx.fillStyle = 'red';
            circle.draw(ctx);
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();
    };

    GEOM2D.prototype.setUp = function() {
        console.log('Creating points', this.numPoint);
        this.point = [];
        var point;
        for (var i = 0; i < this.numPoint; i++) {
            point = new Point();
            point.randomize();
            this.point.push(point);
        }
        console.log('Creating circle', this.numPoint);
        this.circle = [];
        var circle;
        for (var i = 0; i < this.numPoint; i++) {
            circle = new Circle(0, 0, 1);
            circle.randomize();
//            this.circle.push(circle);
        }
        var width = 640;
        var height = 480;
        var circle = new Circle();
        circle.scale(640/2);
        this.circle.push(circle);
        var canvas = new Canvas({
            width : width,
            height : height
        });
        console.log('Creating canvas', canvas, 'w/h', width, height);
        this.canvas = canvas;

        var worldMat = new Matrix33();
        worldMat.translateXY(width /2, height / 2);
        this.width = width;
        this.height = height;
        this.worldMat = worldMat;
        jQuery('body').append(canvas.element);
    };

    return new GEOM2D();
});
