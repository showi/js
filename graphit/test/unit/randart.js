define(function(require) {


    var Canvas = require('graphit/draw/canvas');
    var shape = require('graphit/draw/shape');
    var tool = require('graphit/draw/tool');
    var util = require('graphit/util');

    function RANDART() {
        this.__namespace__ = 'graphit/test/randart';
        var size = util.documentSize();
        this.size = size;
        this.ratio = 4.0;
        this.width = Math.round(size.x  / this.ratio);
        this.height = Math.round(size.y / this.ratio);
        console.log('w/h', this.width, this.height);
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
        jQuery(canvas.getElement()).css({ align:'center',
                                            'vertical-align': 'middle'});
        body.append(canvas.getElement());
        var that = this;
        var max = 1;
        var count = 0;
        this.max = this.width;
        var rotate = 0;
        var miniature = [];
        function removeMiniature(canvas) {
            
        }
        var ratio = 1.0 / this.ratio;
        var mWidth = this.width / this.ratio;
        var mHeight = this.height / this.ratio;
        console.log('mW/mH', mWidth, mHeight);
        var row = Math.round(this.size.x / mWidth);
        var col = Math.round(this.size.y / mHeight);
        console.log('row/col', row, col);
        var maxMiniature = row * col;
        console.log('MaxMiniature', maxMiniature);
        var timeout = 100;
        var pass = (timeout/1000) * max;
        if (pass <= 0) {
            pass = 1;
        }
        console.log('pass', pass);
        console.log('timeout', timeout);
        function fn() {
            for (var i = 0; i < pass; i++) {
                if (miniature.length > maxMiniature) {
                    var c = miniature.pop();
                    function cb() {
                        c.getElement().remove();
                    }
                    setTimeout(cb, 0);
                }
                if (count > max) {
                    var scale = 1.0 / that.ratio;
                    var n = canvas.downScale(scale);
                    miniature.unshift(n);
                    body.append(n.getElement());
                    count = 0;
                    ctx.fillStyle = tool.randomColor();
                    //shape.rectangle(ctx, 0, 0, that.width, that.height);
                    if (randomBool(0.5)) {
                        ctx.fillStyle = tool.randomColor();
                    }
                }
                rotate = (rotate > 360)? 0: rotate + 1;
                count++;
                ctx.rotate(rotate);
                ctx.lineWidth = randInt(5);
                if (randomBool(0.8)) {
                    ctx.fillStyle = tool.randomColor();
                }
                if (randomBool(0.8)) {
                    ctx.fillStyle = tool.randomColor();
                }
                var kind = choice(['line', 'rectangle', 'circle']);
                var method = 'draw_' + kind;
                that[method].call(that, ctx);
            }
            setTimeout(fn, timeout);
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