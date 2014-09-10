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

    var MissingParameterException = require('graphit/exception/MissingParameter');
    var Context = require('graphit/draw/context');
    var DoubleBuffer = require('graphit/draw/doublebuffer');
    var Canvas = require('graphit/draw/canvas');
    var tool = require('graphit/draw/tool');
    var shape = require('graphit/draw/shape');
    var util = require('graphit/util');
    var math = require('graphit/math');

    function CLOCK(width, height, id) {
        this.__MODULE__ = 'graphit/draw/widget/clock';
        if (width === undefined || height === undefined) { throw new MissingParameterException(
                                                                                               'width|height'); }
        this.dbuffer = new DoubleBuffer({
            id : id,
            width : width,
            height : height
        });
        this._width = width;
        this._height = height;
        this.hourFormat = 24;
        this.drawMillisecond = false;
        this.redrawDelay = 1000;
        this.date = new Date();
        var PI = Math.PI / 180;
        this.pi = PI;
        this.msPart = (360 / 1000) * PI;
        this.sPart = (360 / 60) * PI;
        this.mnPart = (360 / 60) * PI;
        this.hPart = (360 / this.hourFormat) * PI;
        this.background = null;
        this.needRefresh = true;
        this.init();
    }

    CLOCK.prototype.init = function() {
        var w = math.min(this._width, this.height) / 8;
        this.sizeMillisecond = w * 0.5;
        this.sizeSecond = w * 4;
        this.sizeMinute = w * 3;
        this.sizeHour = w * 1.5;
    };

    CLOCK.prototype.getElement = function() {
        return this.dbuffer.front.element;
    };
    CLOCK.prototype.drawBackground = function(ctx) {
        if (!this.needRefresh) { return this.dbuffer.back
                .copyData(this.background); }
        this.background = new Canvas({
            width : this._width,
            height : this._height
        });
        ctx = this.background.getCtx();
        var dWidth = this._width / 2;
        var dHeight = this._height / 2;
        ctx.translate(dWidth, dHeight);
        var that = this;
        var tw = null;
        /* Background */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#241B1C';
            tw = that.sizeSecond;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
            ctx.fill();
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#63353B';
            tw = that.sizeMinute;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
            ctx.fill();
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#26211C';
            tw = that.sizeHour;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
            ctx.fill();
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#684E38';
            tw = that.sizeMillisecond;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
            ctx.fill();
        });
        function getFontSize(coef) {
            var num = (that._width / 1000) * coef;
            return num.toString();
        }
        var cX = -5;
        var cY = 0;
        /* Font */
        var part = 360 / 60;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        for (var i = 0; i < 60; i += 5) {
            tool.saveAndRestore(ctx, function(ctx) {
                var angle = (i + 45) * part * that.pi;
                var r = that.sizeMinute;
                var tX = Math.cos(angle);
                var tY = Math.sin(angle);
                ctx.fillStyle = '#DDAA00';
                ctx.strokeStyle = 'black';
                var font = 'bold ' + getFontSize(15).toString() + 'pt Arial';
                ctx.font = font;
                var x = cX + r * tX;
                var y = cY + r * tY;
                ctx.fillText(i, x, y);
                ctx.strokeText(i, x, y);
            });
        }
        part = (360 / that.hourFormat);
        for (var i = 0; i < this.hourFormat; i += 3) {
            tool.saveAndRestore(ctx, function(ctx) {
                var angle = (i + 90) * part * that.pi;
                var r = that.sizeHour;
                var tX = Math.cos(angle);
                var tY = Math.sin(angle);
                ctx.fillStyle = '#DDAA00';
                ctx.strokeStyle = 'black';
                ctx.font = 'bold ' + getFontSize(30) + 'pt Arial';
                var x = cX + r * tX;
                var y = cY + r * tY;
                ctx.fillText(i, x, y);
                ctx.strokeText(i, x, y);
            });
        }
        this.dbuffer.back.copyData(this.background);
    };

    CLOCK.prototype.draw = function() {
        var that = this;
        var ctx = this.dbuffer.back.getCtx();
        tool.saveAndRestore(ctx, function(ctx) {
            that._draw(ctx);
        });
    };
    CLOCK.prototype._draw = function(ctx) {
        var that = this;
        if (this.needRefresh) {
            this.init();
        }
        this.dbuffer.clearBackBuffer();
        var dWidth = this._width / 2;
        var dHeight = this._height / 2;
        ctx.translate(dWidth, dHeight);
        ctx.lineCap = 'round';
        this.drawBackground(ctx);
        /* Milliseconds */
        var s = (this._width / 1000);
        var l = 1;
        if (this.drawMillisecond) {
            tool.saveAndRestore(ctx, function(ctx) {
                var angle = that.date.getMilliseconds() * that.msPart;
                ctx.strokeStyle = '#00462A';
                ctx.lineWidth = 0.5 * l;
                ctx.rotate(angle);
                shape.line(ctx, 0, -that.sizeMillisecond, 0, 0);
                ctx.fill();
                shape.circle(ctx, 0, -that.sizeMillisecond, s);
                ctx.fill();
            });
        }
        /* SECOND */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.strokeStyle = '#71266E';
            ctx.lineWidth = 1 * l;
            var angle = Math.round(that.date.getSeconds()) * that.sPart;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeSecond, 0, 0);
            ctx.stroke();
            shape.circle(ctx, 0, -that.sizeSecond, s * 2);
            ctx.fill();
        });
        /* MINUTES */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.strokeStyle = '#FF7600';
            ctx.lineWidth = 2 * l;
            var angle = Math.round(that.date.getMinutes()) * that.mnPart;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeMinute, 0, 0);
            ctx.stroke();
            shape.circle(ctx, 0, -that.sizeMinute, s * 3);
            ctx.fill();
        });
        /* HOUR */
        tool.saveAndRestore(ctx, function(ctx) {
            var angle = Math.round(that.date.getHours()) * that.hPart;
            ctx.strokeStyle = '#E11D38';
            ctx.lineWidth = 4 * l;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeHour, 0, 0);
            ctx.stroke();
            shape.circle(ctx, 0, -that.sizeHour, s * 4);
            ctx.fill();
        });
        /* Decor */
        var w8 = this._width / 64;
        ctx.fillStyle = '#241B1C';
        this.strokeStyle = '#241B1C';
        shape.rectangle(ctx, -w8, -w8, w8 * 2, w8 * 2);
        ctx.fill();
        /* Flip backbuffer to front */
        this.dbuffer.flip();
        this.needRefresh = false;
    };

    CLOCK.prototype.width = function(value) {
        if (value !== undefined && this._width != value) {
            this._width = value;
            this.dbuffer.width(value);
            this.needRefresh = true;
            return this;
        }
        return this._width;
    };

    CLOCK.prototype.height = function(value) {
        if (value !== undefined && this._height != value) {
            this._height = value;
            this.dbuffer.height(value);
            this.needRefresh = true;
            return this;
        }
        return this._height;
    };
    return CLOCK;
});
