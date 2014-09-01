define(function(require) {


    var Canvas = require('graphit/draw/Canvas');
    var shape = require('graphit/draw/shape');
    var util = require('graphit/draw/tool');

    function RANDART() {
        this.__MODULE__ = 'graphit/test/randart';
        this.width = 640;
        this.height = 480;
    }
    RANDART.prototype.run = function() {
        var canvas = new Canvas({
            width : this.width,
            height : this.height
        });
        var ctx = canvas.getCtx();
        jQuery(canvas.getElement()).draggable().css({
            position : 'absolute',
            top : '1em',
            left : '1em'
        });
        jQuery('body').append(canvas.getElement());
        var that = this;
        var max = 512;
        var count = max;
        this.max = this.width;
        var rotate = 0;
        function fn() {
            if (count > max) {
                count = 0;
                ctx.fillStyle = util.randomColor();
                shape.rectangle(ctx, 0, 0, that.width, that.height);
                ctx.fillStyle = util.randomColor();
            }
            rotate = (rotate > 360)? 0: rotate + 1;
            count++;
            ctx.rotate(rotate);
            ctx.lineWidth = randInt(5);
            ctx.strokeStyle = util.randomColor();
            var kind = choice(['line', 'rectangle', 'circle']);
            var method = 'draw_' + kind;
            that[method].call(that, ctx);
            setTimeout(fn, 10);
        };
        fn();
    };
    RANDART.prototype.draw_line = function(ctx) {
        shape.line(ctx, this.r(), this.r(), this.r(), this.r());
    };
    RANDART.prototype.draw_rectangle = function(ctx) {
        shape.rectangle(ctx, this.r(), this.r(), this.r()/2, this.r()/2);

    };
    RANDART.prototype.draw_circle = function(ctx) {
        shape.circle(ctx, this.r(), this.r(), this.r()/2);
    };
    RANDART.prototype.r = function() {
        return randInt(this.max);
    };
    function randomBool(limit) {
        if (Math.random() > limit) { return true; }
        return false;
    }
    function randInt(max) {
        return Math.floor(Math.random() * max);
    }
    function choice(choices) {
        return choices[randInt(choices.length)];
    }
    return new RANDART();
});