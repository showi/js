define(function(require) {


    var Canvas = require('graphit/draw/Canvas');
    var shape = require('graphit/draw/shape');
    var tool = require('graphit/draw/tool');
    var util = require('graphit/util');

    function RANDART() {
        this.__MODULE__ = 'graphit/test/randart';
        var size = util.getDocumentSize();
        this.size = size;
        this.ratio = 2.0;
        this.width = Math.round(size[0]  / this.ratio);
        this.height = Math.round(size[1] / this.ratio);
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
        var max = 128;
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
        var row = Math.round(this.size[0] / mWidth);
        var col = Math.round(this.size[1] / mHeight);
        console.log('row/col', row, col);
        var maxMiniature = row * col;
        console.log('MaxMiniature', maxMiniature);
        function fn() {
            for (var i = 0; i < 10; i++) {
                if (miniature.length > maxMiniature) {
                    var c = miniature.pop();
                    function cb() {
                        c.getElement().remove();
                    }
                    setTimeout(cb, 1);
                }
                if (count > max) {
                    var scale = 1.0 / that.ratio;
                    console.log('scale', scale);
                    var n = canvas.downScale(scale);
                    miniature.unshift(n);
                    body.append(n.getElement());
                    count = 0;
                    ctx.fillStyle = tool.randomColor();
                    shape.rectangle(ctx, 0, 0, that.width, that.height);
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
            setTimeout(fn, 100);
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