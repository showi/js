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
    var BondCircle = require('graphit/bond/circle2d');
    var Canvas = require('graphit/draw/canvas');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    var math = require('graphit/math');
    var util = require('graphit/util');
    var Renderer = require('graphit/renderer');

    require('graphit/extend/jquery');

    function BCircle() {
        Circle.apply(this, arguments);
        this.bound = new BondCircle(this, arguments[3]);
        
    }
    BCircle.prototype = Object.create(Circle.prototype);
    var data = {
                sun: {
                    radius: 696342,
                    color: 'yellow',
                    position: [0, 0],
                },
                earth: {
                    radius: 6378.137*10,
                    color: 'blue',
                    position: [149600000, 0]
                }
    };
    
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
        var scale = 1/20000;
        ctx.scale(scale, scale);
        ctx.translate(1/scale*this.dw, 1/scale*this.dh);
        this.drawPlanet(ctx, 'sun');
        this.drawPlanet(ctx, 'earth');
//        ctx.fill();
//        ctx.stroke();
        ctx.strokeStyle = 'red';
        this.drawPoint(ctx, 100, 100);
        ctx.stroke();
        ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                      trans._data[4], trans._data[2], trans._data[5]);
        ctx.restore();
    };

    GEOM2D.prototype.drawPlanet = function(ctx, name) {
        var d = data[name];
        ctx.save();
        ctx.fillStyle = d.color;
        var trans = this.worldMat;
        ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                      trans._data[4], trans._data[2], trans._data[5]);
        this.drawCircle(ctx, d.position[0],
                             d.position[1], 
                             d.radius);
        ctx.fill();
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

    GEOM2D.prototype.drawCircle = function(ctx, x, y, radius) {
        var trans;
        var circle = new Circle(x, y, radius);
        circle.applyWorldTransform(this.worldMat);
        trans = circle.worldTransform;
        ctx.transform(trans._data[0], trans._data[1], trans._data[3],
                      trans._data[4], trans._data[2], trans._data[5]);
        circle.draw(ctx);
    };

    GEOM2D.prototype.setUp = function() {
        var size = util.windowSize();
        var width = size.x;
        var height = size.y;
        var dw = width / 2;
        var dh = height / 2;
        this.width = width;
        this.height = height;
        this.dw = dw;
        this.dh = dh;
        this.circle = [];
        this.point = [];
        var worldMat = new Matrix33();
        worldMat.translateXY(width, dh);
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
        body.center();
        this.body = body;
        this.numCircle = 10;
        for (var i = 0; i < this.numCircle; i++) {
            var circle = new BCircle(math.randInt(-dw, dw),
                                      math.randInt(-dh, dh));
            this.circle.push(circle);
        }
    };

    return new GEOM2D();
});
