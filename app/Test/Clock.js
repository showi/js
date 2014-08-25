define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var Context = require('../Draw/Context');
    var Canvas = require('../Draw/Canvas');
    var tool = require('../Draw/tool');
    var shape = require('../Draw/shape');
    var util = require('../util');

    function MODULE(width, height, id) {
        if (width === undefined || height === undefined) { throw new MissingParameterException(
                'width|height'); }
        this.canvas = new Canvas({
            id : id,
            width : width,
            height : height
        });
        this.width = width;
        this.height = height;
        var w = this.width / 8;
        this.millisecondNeedleWidth = w * 1;
        this.secondNeedleWidth = w * 2;
        this.minuteNeedleWidth = w * 4;
        this.hourNeedleWidth = w * 3;
        var PI = Math.PI / 180;
        this.msPart = (360 / 1000) * PI;
        this.sPart = (360 / 60) * PI;
        this.mnPart = (360 / 60) * PI;
        this.hPart = (360 / 24) * PI;
        this.drawMillisecond = false;
        this.redrawDelay = 1000;
        
        this.sizeMillisecond = w * 4;
        this.sizeSecond = w * 3;
        this.sizeMinute = w * 2;
        this.sizeHour = w * 1;
        this.date = new Date();
    }

    MODULE.prototype.draw = function() {
        this.canvas.clearBackBuffer();
        var ctx = this.canvas.back.ctx;
        var dWidth = this.width / 2;
        ctx.translate(dWidth, dWidth);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#39AE7F';
        /* Background */
        ctx.save();
        ctx.fillStyle = '#00462A';
        var tw = this.sizeMillisecond;
        shape.rectangle(ctx, -tw, -tw, tw*2, tw*2);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = '#007646';
        tw = this.sizeSecond;
        shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = '#19AF73';
        tw = this.sizeMinute;
        shape.rectangle(ctx, -tw, -tw, tw * 2, tw * 2);
        ctx.restore();
        /* Font */
        /* Milliseconds */
        var s = (this.width / 1000);
        var l = 0.8;
        if (this.drawMillisecond) {
            ctx.save();
            var angle = this.date.getMilliseconds() * this.msPart;
            ctx.strokeStyle = '#00462A';
            ctx.lineWidth = 0.5;
            ctx.rotate(angle);
            shape.line(ctx, 0, -this.sizeMillisecond, 0, 0);
            shape.circle(ctx, 0, -this.sizeMillisecond, s);
            ctx.restore();
        }
        /* SECOND */
        ctx.save();
        ctx.strokeStyle = '#080348';
        ctx.lineWidth = 1 * l;
        angle = this.date.getSeconds() * this.sPart;
        ctx.rotate(angle);
        shape.line(ctx, 0, -this.sizeSecond, 0, 0);
        shape.circle(ctx, 0, -this.sizeSecond, s * 2);
        ctx.restore();
        /* MINUTES */
        ctx.save();
        ctx.strokeStyle = '#DDAA00';
        ctx.lineWidth = 2 * l;
        angle = this.date.getMinutes() * this.mnPart;
        ctx.rotate(angle);
        shape.line(ctx, 0, -this.sizeMinute, 0, 0);
        shape.circle(ctx, 0, -this.sizeMinute, s * 3);
        ctx.restore();
        /* HOUR */
        ctx.save();
        angle = this.date.getHours() * this.hPart;
        ctx.strokeStyle = '#DD4200';
        ctx.lineWidth = 4 * l;
        ctx.rotate(angle);
        shape.line(ctx, 0, -this.sizeHour, 0, 0);
        shape.circle(ctx, 0, -this.sizeHour, s * 4);
        ctx.restore();
        /* Decor */
        var w8 = this.width / 64;
        shape.rectangle(ctx, -w8, -w8, w8 * 2, w8 * 2);
        /* Flip backbuffer to front */
        this.canvas.flip();
    };
    return MODULE;
});