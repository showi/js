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

    require('graphit/extend/jquery');

    function MOUSE() {

    }

    MOUSE.prototype.run = function() {
        var body = jQuery('body');
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
        canvas.clear('black');
        var ctx = canvas.getCtx();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'white';
        var elm = canvas.getElement();
        body.append(elm);
        jQuery(elm).center();
        var mouse = new Mouse();
        mouse.registerMouseMove(elm);
        mouse.registerMouseUpDown(elm, function(event) {
            mouse.recordEnd.call(mouse);
        }, function(event) {
            mouse.recordStart.call(mouse);
        }, function(event) {
            var size = 50;
            mouse.iterRecord.call(this, function(record) {
                shape.circle(ctx, record.pos.x, record.pos.y, size);
                size--;
            }, 20, true);
        });
        this.mouse = mouse;
        body.append('<div><h2>Click Me!</h2></div>');
    };

    return new MOUSE();
});
