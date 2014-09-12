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

    require('graphit/extend/jquery');

    var util = require('graphit/util');
    var math = require('graphit/math/namespace');
    var test = require('graphit/test/util');
    var Canvas = require('graphit/draw/canvas');
    var tool = require('graphit/draw/tool');
    var body = jQuery('body');

    function T_RECT() {
    }

    function log() {
        test.log.apply(test, arguments);
    }

    function debugRect(rect, msg) {
        log('--- ---', msg, '--- ---');
        log('center', rect.center);
        log('x/y', rect.x, rect.y);
        log('w/h', rect.width, rect.height);
    }

    function drawRect(ctx, rect) {
        ctx.save();
        ctx.fillStyle = rect.fillStyle;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.restore();
    }

    T_RECT.prototype.run = function() {
        jQuery('.graphit-container.log').hide();
        var size = util.windowSize();
        var canvas = new Canvas({width: size.x, height: size.y});
        log('w/h', size.x, size.y);
        var screen = math.rect.Create(0, 0, size.x, size.y);
        screen.fillStyle = 'white';
        body.append(canvas.element);
        jQuery(canvas.element).center();
        var ctx = canvas.getCtx();
        drawRect(ctx, screen);
        var maxCol = size.x / 64;
        var maxRow = size.y / 64;
        console.log('max col/row', maxCol, maxRow);
        var pW = size.x / maxCol;
        var pH = size.y / maxRow;
        function draw() {
        for (var j = 0; j < size.x; j+=pW) {
            for (var i = 0; i < size.y; i+=pH) {
                var r = math.rect.Create(j, i, pW, pH);
                r.fillStyle = tool.randomColor();
                drawRect(ctx, r);
            }            
        }
        setTimeout(draw,1000);
        }
        draw();
    };
    return new T_RECT();
});
