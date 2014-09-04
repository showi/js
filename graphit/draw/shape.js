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

    var util = require('../util');
    var tool = require('./tool');

    var SHAPE = {
        __MODULE__ : 'graphit/draw/shape',
        line : function(ctx, sx, sy, ex, ey) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        },
        rectangle : function(ctx, lx, ly, rx, ry) {
            ctx.beginPath();
            ctx.rect(lx, ly, rx, ry);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        },
        circle : function(ctx, centerX, centerY, radius) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        }
    };
    return SHAPE;
});