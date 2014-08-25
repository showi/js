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

        this.secondNeedleWidth = (this.width / 4) * 2;
        this.hourNeedleWidth = (this.width / 4) * 3;
        this.millisecondNeedleWidth = (this.width / 4) * 1;
    }

    MODULE.prototype.draw = function() {
        var d = new Date();
        this.canvas.clearBackBuffer();
        var ctx = this.canvas.back.ctx;
        util.setContext(this.canvas.back);
        ctx.translate(this.width / 2, this.height / 2);
        var angle = d.getSeconds() * (360 / 60) * Math.PI / 180;
        /* SECOND */
        ctx.save();
        ctx.strokeStyle = 'black';
        ctx.rotate(angle);
        shape.line(0, -this.secondNeedleWidth, 0, 0);
        ctx.restore();
        /* HOUR */
        ctx.save();
        angle = d.getHours() * (360 / 24) * Math.PI / 180;
        ctx.strokeStyle = 'red';
        ctx.rotate(angle);
        shape.line(0, -this.hourNeedleWidth, 0, 0);
        ctx.restore();
        /* Milliseconds */
        ctx.save();
        angle = d.getMilliseconds() * (360 / 1000) * (Math.PI / 180);
        ctx.strokeStyle = 'blue';
        ctx.rotate(angle);
        shape.line(0, -this.millisecondNeedleWidth, 0, 0);
        ctx.restore();
        /* Decor */
        shape.rectangle(-25, -25, 50, 50);
        /* Flip backbuffer to front */
        this.canvas.flip();
    };
    return MODULE;
});