define(function(require) {
 
    var Node = require('graphit/tree/node');
    var Line = require('graphit/math/line');

    function PRIMITIVE() {
        this.__namespace__ = 'graphit/tree/node/primitive';
        Node.call(this, arguments);
        this.traversable(false);
        this.primitives = [];
    };

    PRIMITIVE.prototype = Object.create(Node.prototype);
    
    PRIMITIVE.prototype.appendChild = function(primitive) {
        this.primitives.push(primitive);
    };

    PRIMITIVE.prototype.render = function(shape, ctx) {
        for (var i = 0; i < this.primitives.length; i++) {
            var child = this.primitives[i];
            if (child instanceof Line) {
//                console.log('Drawing line', child);
                shape.line(ctx,
                           child.a.x, child.a.y, 
                           child.b.x, child.b.y);
            }
        }
    };
    return PRIMITIVE;
});