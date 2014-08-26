define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var Context = require('../Draw/Context');
    var Canvas = require('../Draw/Canvas');
    var tool = require('../Draw/tool');
    var shape = require('../Draw/shape');
    var util = require('../util');

    function CLOCK(width, height, id) {
        this.__MODULE__ = 'Test/Clock';
        if (width === undefined || height === undefined) { throw new MissingParameterException(
                'width|height'); }
        this.canvas = new Canvas({
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
        this.needRefresh = true;
        this.init();
    }

    CLOCK.prototype.init = function() {
        var w = this._width / 8;
        this.sizeMillisecond = w * 0.5;
        this.sizeSecond = w * 3;
        this.sizeMinute = w * 2;
        this.sizeHour = w * 1;
    };

    CLOCK.prototype.getElement = function() {
        return this.canvas.front.element;
    };
    CLOCK.prototype.drawBackground = function(ctx) {
        if (!this.needRefresh) {
            if (this._back !== undefined) {
                return this.canvas.back.copyData(this._back.front);               
            }
        }
        this._back = new Canvas({
            width : this._width,
            height : this._height
        });
        ctx = this._back.front.ctx;
        var dWidth = this._width / 2;
        ctx.translate(dWidth, dWidth);
        var that = this;
        var tw = null;
        /* Background */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#241B1C';
            tw = that.sizeSecond / 2;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#63353B';
            tw = that.sizeMinute / 2;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#26211C';
            tw = that.sizeHour / 2;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        });
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.fillStyle = '#684E38';
            tw = that.sizeMillisecond / 2;
            shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        });
        var fontSize = (this._width / (this._width * 2));
        function getFontSize(coef) {
            var num = (that._width / 1000) * coef;
            return num.toString();
        }
        var cX = -5;
        var cY = 0;
        /* Font */
        var part = 360 / 60;
//        ctx.font = 'bold 20pt Calibri';
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
                console.log('Font: ', font);
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
        console.log('BackFront: ', this._back.front);
        this.canvas.back.copyData(this._back.front);
    };
    CLOCK.prototype.draw = function() {
        var that = this;
        if (this.needRefresh) {
            this.init();
        }
        this.canvas.clearBackBuffer();
        var ctx = this.canvas.back.ctx;
        var dWidth = this._width / 2;
        ctx.translate(dWidth, dWidth);
        ctx.lineCap = 'round';
        this.drawBackground(ctx);
        /* Milliseconds  */
        var s = (this._width / 1000);
        var l = 0.8;
        if (this.drawMillisecond) {
            tool.saveAndRestore(ctx, function(ctx) {
                var angle = that.date.getMilliseconds() * that.msPart;
                ctx.strokeStyle = '#00462A';
                ctx.lineWidth = 0.5;
                ctx.rotate(angle);
                shape.line(ctx, 0, -that.sizeMillisecond, 0, 0);
                shape.circle(ctx, 0, -that.sizeMillisecond, s);
            });
        }
        /* SECOND */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.strokeStyle = '#71266E';
            ctx.lineWidth = 1 * l;
            angle = that.date.getSeconds() * that.sPart;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeSecond, 0, 0);
            shape.circle(ctx, 0, -that.sizeSecond, s * 2);
        });
        /* MINUTES */
        tool.saveAndRestore(ctx, function(ctx) {
            ctx.strokeStyle = '#FF7600';
            ctx.lineWidth = 2 * l;
            angle = that.date.getMinutes() * that.mnPart;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeMinute, 0, 0);
            shape.circle(ctx, 0, -that.sizeMinute, s * 3);
        });
        /* HOUR */
        tool.saveAndRestore(ctx, function(ctx) {
            angle = that.date.getHours() * that.hPart;
            ctx.strokeStyle = '#E11D38';
            ctx.lineWidth = 4 * l;
            ctx.rotate(angle);
            shape.line(ctx, 0, -that.sizeHour, 0, 0);
            shape.circle(ctx, 0, -that.sizeHour, s * 4);
        });
        /* Decor */
        var w8 = this._width / 64;
        this.fillStyle = '#241B1C';
        this.strokeStyle = '#241B1C';
        shape.rectangle(ctx, -w8, -w8, w8 * 2, w8 * 2);
        /* Flip backbuffer to front */
        this.canvas.flip();
        this.needRefresh = false;
    };

    CLOCK.prototype.width = function(value) {
        if (value !== undefined) {
            this._width = value;
            this.canvas.width(value);
            this.needRefresh = true;
            return this;
        }
        return this._width;
    };

    CLOCK.prototype.height = function(value) {
        if (value !== undefined) {
            this._height = value;
            this.canvas.height(value);
            this.needRefresh = true;
            return this;
        }
        return this._height;
    };
    return CLOCK;
});