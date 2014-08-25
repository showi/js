define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var Context = require('../Draw/Context');
    var Canvas = require('../Draw/Canvas');
    var tool = require('../Draw/tool');
    var shape = require('../Draw/shape');
    var util = require('../util');

    function MODULE(width, height, id) {
        if (width === undefined || height === undefined) { throw new MissingParameterException(); }
        this.canvas = new Canvas({
            id : 'MyClock',
            width : 200,
            height : 200
        });
        this.width = width;
        this.height = height;
        this.millisecondNeedleWidth = (this.width / 4) * 1;
        this.secondNeedleWidth = (this.width / 4) * 2;
        this.minuteNeedleWidth = (this.width / 4) * 3;
        this.hourNeedleWidth = (this.width / 4) * 4;
    }

    MODULE.prototype.draw = function() {
        var d = new Date();
        this.canvas.clearBackBuffer();
        var ctx = this.canvas.back.ctx;
        util.setContext(this.canvas.back);
        ctx.translate(this.width / 2, this.height / 2);
        /* Decor */
        ctx.save();
        ctx.fillStyle = '#222222';
        shape.rectangle(-this.width/2, -this.width/2, this.width, this.width);
        ctx.fillStyle = '#444444';
        shape.rectangle(-50, -50, 100, 100);
        ctx.restore();
        var angle = d.getSeconds() * (360 / 60) * Math.PI / 180;
        /* Milliseconds */
        ctx.save();
        angle = d.getMilliseconds() * (360 / 1000) * (Math.PI / 180);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 0.5;
        ctx.rotate(angle);
        shape.line(0, -this.millisecondNeedleWidth, 0, 0);
        ctx.restore();
        /* SECOND */
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        angle = d.getSeconds() * (360 / 60) * (Math.PI / 180);
        ctx.rotate(angle);
        shape.line(0, -this.secondNeedleWidth, 0, 0);
        ctx.restore();
        /* MINUTES */
        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        angle = d.getMinutes() * (360 / 60) * (Math.PI / 180);
        ctx.rotate(angle);
        shape.line(0, -this.minuteNeedleWidth, 0, 0);
        ctx.restore();
        /* HOUR */
        ctx.save();
        angle = d.getHours() * (360 / 24) * Math.PI / 180;
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.rotate(angle);
        shape.line(0, -this.hourNeedleWidth, 0, 0);
        ctx.restore();

        /* Decor */
        shape.rectangle(-5, -5, 10, 10);
        /* Flip backbuffer to front */
        this.canvas.flip();
    };
    return MODULE;
});