define(function(require) {

    var TransformMixin = require('graphit/tree/mixin/transform');
    var Primitive = require('graphit/tree/node/primitive');
    var mainUtil = require('graphit/util');
    var eCapability = require('graphit/tree/enum/capability');
    var utree = require('graphit/tree/util');
    var factory = require('graphit/tree/factory');
    var Vector2d = require('graphit/math/vector2d');

    function TRANSFORM() {
        this.__namespace__ = 'graphit/test/transform';
    }

    TRANSFORM.prototype.run = function() {
        var p1 = factory.node(Primitive, undefined, [TransformMixin]);
        var p2 = factory.node(Primitive, undefined, [TransformMixin]);
        console.log('p1', p1);
        console.log('p2', p2);
        p1.rotate(45);
        p1.translate(new Vector2d(3, 5));
        console.log(new Primitive());
        
    };

    return new TRANSFORM();
});
