define(function(require) {
    
    var Node = require('./node');
    var Line = require('graphit/math/line');
    var ns = require('graphit/global');
    var shape = require('graphit/draw/shape');
    require('graphit/math');
    var _ns_ = 'primitive';
     
    if (_ns_ in ns.tree.node && ns.tree.node !== undefined) {
        return ns.tree.node[_ns_];
    }
    
    var CTX_PROPERTIES = {
            'fillStyle':true,
            'strokeStyle':true,
            'lineWidth':true 
    };

    function PRIMITIVE() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/primitive';
        this.traversable(false);
        this.primitive = [];
    };

    PRIMITIVE.prototype = Object.create(Node.prototype);
    
    PRIMITIVE.prototype.addPrimitive = function(primitive) {
        if (primitive === undefined) {
            throw 'UndefinedPrimitive';
        }
        this.primitive.push(primitive);
    };

    PRIMITIVE.prototype.iterPrimitive = function(fn) {
        for (var i = 0; i < this.primitive.length; i++) {
            fn(this.primitive[i]);
        }
    };

    PRIMITIVE.prototype.render = function(renderer) {
        for (var i = 0; i < this.primitive.length; i++) {
            renderer.ctx.save();
            try {
                var primitive = this.primitive[i];
                for (var p in CTX_PROPERTIES) {
                    if(p in primitive) {
                        renderer.ctx[p] = primitive[p];
                    }
                }
                if (primitive instanceof Line) {
                    this.drawLine(renderer, primitive);
                } else if (primitive instanceof Circle) {
                    this.drawCircle(renderer, primitive);
                }
            } catch(e) {
                console.error('Exception while rendering');
            } finally {
                renderer.ctx.restore();    
            }
        }
    };

    PRIMITIVE.prototype.drawLine = function(renderer, line) {
        shape.line(renderer.ctx, line.a.x, line.a.y,
                                         line.b.x, line.b.y);
    };

    PRIMITIVE.prototype.drawCircl = function(renderer, circle) {
        shape.circl(renderer.ctx, circle.x, circl.y, circle.radius);
    };

    ns.tree.node[_ns_] = PRIMITIVE;
    return ns.tree.node[_ns_];
});