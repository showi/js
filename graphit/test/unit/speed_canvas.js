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

    var Canvas = require('graphit/draw/canvas');
    var test = require('graphit/test/util');
    var shape = require('graphit/draw/shape');

    function TEST_SPEED_CANVAS() {
        this.width = 100;
        this.height = 100;
        this.dW = this.width / 2;
        this.dH = this.height / 2;
    }

    TEST_SPEED_CANVAS.__namespace__ = 'graphit/test/unit/speed_canvas';

    TEST_SPEED_CANVAS.prototype.run = function() {

    };

    function drawRect(ctx, width, height) {
        ctx.fillStyle = 'red';
        shape.rectangle(ctx, 0, 0, width, height);
        ctx.fill();
    }

    TEST_SPEED_CANVAS.prototype.speed_create = function() {
        var canvas = new Canvas({
            width : this.width,
            height : this.height
        });
        var ctx = null;
        for (var i = 0; i < test.numPassLow; i++) {
            ctx = canvas.getCtx();
            drawRect(ctx, this.dW, this.dH);
            canvas = new Canvas({
                width : this.width,
                height : this.height
            });
            canvas.clear('white');
        }
    };

    TEST_SPEED_CANVAS.prototype.speed_clear = function() {
        var canvas = new Canvas({
            width : this.width,
            height : this.height
        });
        var ctx = canvas.getCtx();
        for (var i = 0; i < test.numPassLow; i++) {
            drawRect(ctx, this.dW, this.dH);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            canvas.clear('white');
        }
    };
    return new TEST_SPEED_CANVAS();
});
