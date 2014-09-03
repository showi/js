define(function(require) {

    var Primitive = require('graphit/tree/node/primitive');
    var Node = require('graphit/tree/node/node');
    var TransMixin = require('graphit/tree/mixin/transform');
    var DoubleBuffer = require('graphit/draw/doublebuffer');
    var shape = require('graphit/draw/shape');
    var Line = require('graphit/math/line');
    var util = require('graphit/util');
    var tool = require('graphit/draw/tool');
    var factory = require('graphit/factory');
    var Renderer = require('graphit/tree/renderer');
    require('graphit/extend/jquery');

    function TREE() {
        this.__namespace__ = 'graphit/test/movingpaint';
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
        line.lineWidth = Math.randFloat(0.1, 5.0);
        line.lineCap = util.choice(['butt', 'round', 'squared']);
        line.lineJoin = util.choice(['bevel', 'round', 'miter']);
        return line;
    }

    function mutePrimitive(node, max, prevNode) {
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
        for (var i = 0; i < node.primitive.length; i++) {
            var p = node.primitive[i];
            p.lineWidth = randValue(p.lineWidth);
            //            p.strokeStyle = tool.randomColor();
            var fs = p.fillStyle !== undefined? p.fillStyle: tool.randomColor();
//            if (prevNode != null) {
//                p.strokeStyle = prevNode.strokeStyle;
//                p.fillStyle = prevNode.fillStyle;
//            } else {
//                p.strokeStyle = tool.randomColor();
//                p.fillStyle = tool.randomColor();
//            }
            if (p instanceof Line) {
                p.a.x = randValue(p.a.x);
                p.a.y = randValue(p.a.y);
                p.b.x = randValue(p.b.x);
                p.b.y = randValue(p.b.y);
            }
        }
    };
    function muteTree(pool, max) {
        var prevNode = null;
        for (var i = 0; i < pool.length; i++) {
            var node = pool[i];
            if (node instanceof Primitive) {
                mutePrimitive(node, max, prevNode);
            }
            prevNode = node;
        }
    }

    TREE.prototype.run = function() {
        console.log('----- Testing tree -----');
        var timeout = 10;
        var numPrimitive = 512;
        var size = util.documentSize();
        var scale = 0.80;
        var width = size.x * scale;
        var height = size.y * scale;
        var buffer = new DoubleBuffer({
            width : width,
            height : width
        });
        var canvas = buffer.front;
        var body = jQuery('body');
        var container = jQuery('<div class="graphit-test"></div>');
        var elm = canvas.getElement();
        container.width(width).height(height).center();
        container.append(elm);
        body.append(container);
        var pool = [];
        var root = factory.tree.node(Node, {pool: pool}, [TransMixin]);
        var prim = factory.tree.node(Primitive, {
            pool : pool
        }, [TransMixin]);
        for (var i = 0; i < numPrimitive; i++) {
            prim.addPrimitive(genLine(width, height));
        }
        root.appendChild(prim);
        console.log('Root', root);
        var renderer = new Renderer({
            root : root,
            ctx : canvas.getCtx()
        });
        renderer.renderInit = function(r) {
            r.ctx = buffer.back.getCtx();
            //r.ctx.translate(width / 2, height / 2);
            //r.root.transform.translate(width / 2, height, 2);
        };
        var that = this;
        this.timeout = 500;
        this.pauseTimeout = 1000;
        this.frames = 0;
        this.fps = 0;
        var count = 0;
        var numCount = 100;
        var startTime = Date.now();
        var endTime = undefined;
        var delta = 0;

        renderer.pre_render = function(node) {
            buffer.clearBackBuffer();
        };

        renderer.render = function(node) {
            if ('render' in node) {
                node.render(renderer);
            }
        };
        
        renderer.post_render = function(node) {
//            renderer.root.transform.rotate(0.1 * Math.PI / 180);
            buffer.flip();
            muteTree(pool, that.width);
            that.frames++;
            if (count >= numCount) {
                endTime = Date.now();
                delta = (endTime - startTime);
                that.fps = Math.round((count / delta) * 1000);
                startTime = endTime;
                count = 0;
            } else {
                count++;
            };
        };
        
        /* Main Loop */
        function loop() {
            renderer.step();
            setTimeout(loop, timeout);
        }
        loop();
    };
    return new TREE();
});
