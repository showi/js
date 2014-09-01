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
        var body = jQuery('body');
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
        body.append(canvas.getElement());
        var that = this;
        var max = 256;
        var count = 0;
        this.max = this.width;
        var rotate = 0;
        var miniature = [];
        function fn() {
            if (miniature.length > 64) {
                var c = miniature.pop();
                jQuery('#' + c.getElement().id).remove();
                doClean = 0;
            }
            if (count > max) {
                var n = canvas.downScale(0.25);
                miniature.unshift(n);
                body.append(n.getElement());
                count = 0;
                ctx.fillStyle = util.randomColor();
                shape.rectangle(ctx, 0, 0, that.width, that.height);
                if (randomBool(0.5)) {
                    ctx.fillStyle = util.randomColor();
                }
            }
            rotate = (rotate > 360)? 0: rotate + 1;
            count++;
            ctx.rotate(rotate);
            ctx.lineWidth = randInt(5);
            if (randomBool(0.8)) {
                ctx.fillStyle = util.randomColor();
            }
            if (randomBool(0.8)) {
                ctx.fillStyle = util.randomColor();
            }
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