define(function(require) {

    var util = require('graphit/test/util');
    var Vector2d = require('graphit/math/vector2d');

    function VECTOR2D() {
        this.__namespace__ = 'graphit/test/vector2d';
    }

    VECTOR2D.prototype.run = function() {

    };

    function test_fn(name) {        
        function outer() {
            var a = new graphit.math.vector2d();
            var b = new graphit.math.vector2d();
            a.randomize();
            b.randomize();
            function fn() {
                return a[name](b);
            }
            return util.testFunction('Vector2d', name, fn);
        }
        setTimeout(outer, 0);
//        outer();
    };

    VECTOR2D.prototype.test_add = function() {
        test_fn('add');
    };

    VECTOR2D.prototype.test_sub = function() {
        test_fn('sub');
    };

    VECTOR2D.prototype.test_mul = function() {
        test_fn('mul');
    };

    VECTOR2D.prototype.test_div = function() {
        test_fn('div');
    };

    VECTOR2D.prototype.test_copy = function() {
        test_fn('copy');
    };

    VECTOR2D.prototype.test_length = function() {
        test_fn('length');
    };
    VECTOR2D.prototype.test_randomize = function() {
        test_fn('randomize');
    };
    return new VECTOR2D();
});
