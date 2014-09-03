define(function(require) {

    var Primitive = require('graphit/tree/node/primitive');
    var DoubleBuffer = require('graphit/draw/doublebuffer');
    var shape = require('graphit/draw/shape');
    var Line = require('graphit/math/line');
    var util = require('graphit/util');
    var tool = require('graphit/draw/tool');
    var factory = require('graphit/factory');
    var Renderer = require('graphit/tree/renderer');

    jQuery.fn.center = function() {
        console.log('height:', $(document).height());
        console.log('outerHeight:', this.outerHeight());
        this.css({
            "position" : "fixed",
            "top" : ($(document).height() / 2) - (this.height() / 2),
            "left" : ($(document).width() / 2) - (this.outerWidth() / 2),
        });
        return this;
    };

    function TREE() {
        this.__MODULE__ = 'graphit/test/tree';
    }

    function genLine(width, height) {
        var max = Math.max(width, height);
        function randInt(m) {
            return Math.randInt(0, m);
        }
        var line = new Line({
            x : randInt(width),
            y : randInt(height)
        }, {
            x : randInt(width),
            y : randInt(height)
        });
        line.fillStyle = tool.randomColor();
        line.strokeStyle = tool.randomColor();
        line.lineWidth = Math.randInt(0, 10);
        return line;
    }

    function mutePrimitive(node, max) {
        var step = 0.5;
        function randValue(value) {
            var sign = true;
            if (Math.random() > 0.5) {
                sign = false;
            }
            var add = Math.randFloat(0.0, step);
            if (value + add > max) { return value - add; }
            if (!sign) { return value - add; };
            return value + add;
        }
        node.iterPrimitive(function(p) {
            if (p instanceof Line) {
                p.a.x = randValue(p.a.x);
                p.a.y = randValue(p.a.y);
                p.b.x = randValue(p.b.x);
                p.b.y = randValue(p.b.y);
            }
        });
    };
    function muteTree(pool, max) {
        for (var i = 0; i < pool.length; i++) {
            var node = pool[i];
            if (node instanceof Primitive) {
                mutePrimitive(node, max);
            }
        }
    }

    TREE.prototype.pause = function(v) {
        if (v === undefined) { return this._pause; }
        this._pause = (v == true) ? true : false;
    };
    TREE.prototype.alive = function(v) {
        if (v === undefined) { return this._alive; }
        this._alive = (v == true) ? true : false;
    };

    TREE.prototype.start = function() {
        this.run();
    };

    TREE.prototype.run = function() {
        console.log('----- Testing tree -----');
        var size = util.documentSize();
        var scale = 0.98;
        var width = size.x * scale;
        var height = size.y * scale;
        var db = new DoubleBuffer({
            width : width,
            height : width
        });
        var canvas = db.front;
        var body = jQuery('body');
        var elm = canvas.getElement();
        body.append(elm);
        jQuery(elm).center();

        var pool = [];
        var root = factory.tree.node(Primitive, {
            pool : pool
        });
        for (var i = 0; i < 256; i++) {
            root.addPrimitive(genLine(width, height));
        }
        console.log('Root', root);
        var renderer = new Renderer({
            root : root,
            ctx : canvas.getCtx()
        });
        renderer.pre_render = function(r) {
            r.ctx = db.back.getCtx();
            r.ctx.save();
            r.ctx.fillStyle = 'rgba(0.0, 0.0, 0.0, 0.0)';
            shape.rectangle(r.ctx, 0, 0, width, height);
            r.ctx.restore();
        };
        var that = this;
        this.timeout = 500;
        this.startTime = new Date();
        this.pauseTimeout = 1000;
        this.frames = 0;
        this.fps = 0;
        this.pause(false);
        this.alive(true);
        var count = 0;
        var numCount = 128;
        function render() {
            if (!that.alive()) {
                console.log('Quit...');
            }
            var ctimeout = that.timeout;
            if (that.pause()) {
                ctimeout = that.pauseTimeout;
            } else {
                db.clearBackBuffer();
                renderer.update();
                renderer.render();
                db.flip();
                muteTree(pool, that.width);
                that.frames++;
                if (count > numCount) {
                    var endTime = new Date();
                    that.delta = (endTime - that.startTime) / 1000;
                    that.fps = (count / that.delta);
                    that.startTime = new Date();
                    count = 0;
                } else {
                    count++;
                }
            }
            setTimeout(render, ctimeout);
        }
        render();
    };
    return new TREE();
});
