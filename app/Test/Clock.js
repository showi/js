define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var Context = require('../Draw/Context');
    var Canvas = require('../Draw/Canvas');
    var tool = require('../Draw/tool');
    var shape = require('../Draw/shape');
    var util = require('../util');

    function MODULE(width, height, id) {
        if (width === undefined || height === undefined) { 
            throw new MissingParameterException('width|height');
        }
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
        this.minuteNeedleWidth = w * 3;
        this.hourNeedleWidth = w * 4;
        var PI = Math.PI / 180;
        this.msPart = (360 / 1000) * PI;
        this.sPart = (360 / 60) * PI;
        this.mnPart = (360 / 60) * PI;
        this.hPart = (360 / 24) * PI;
    }

    MODULE.prototype.draw = function(d) {
        var d = new Date();
        this.canvas.clearBackBuffer();
        var ctx = this.canvas.back.ctx;
        util.setContext(this.canvas.back);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.lineCap = 'round';
        /* Decor */
        ctx.save();
        ctx.fillStyle = '#222222';
        shape.rectangle(-this.width / 2, -this.width / 2, this.width,
                this.width);
        ctx.fillStyle = '#444444';
        var w3 = (this.width / 8) * 2;
        shape.rectangle(-w3, -w3, w3*2, w3*2);
        ctx.restore();
        /* Milliseconds */
        ctx.save();
        var angle = d.getMilliseconds() * this.msPart;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 0.5;
        ctx.rotate(angle);
        shape.line(0, -this.millisecondNeedleWidth, 0, 0);
        ctx.restore();
        /* SECOND */
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        angle = d.getSeconds() * this.sPart;
        ctx.rotate(angle);
        shape.line(0, -this.secondNeedleWidth, 0, 0);
        ctx.restore();
        /* MINUTES */
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        angle = d.getMinutes() * this.mnPart;
        ctx.rotate(angle);
        shape.line(0, -this.minuteNeedleWidth, 0, 0);
        ctx.restore();
        /* HOUR */
        ctx.save();
        angle = d.getHours() * this.hPart;
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.rotate(angle);
        shape.line(0, -this.hourNeedleWidth, 0, 0);
        ctx.restore();
        /* Decor */
        var w8 = this.width / 64;
        shape.rectangle(-w8, -w8, w8*2, w8*2);
        /* Flip backbuffer to front */
        this.canvas.flip();
    };
    return MODULE;
});