define(function(require) {

    var util = require('graphit/test/util');
    var Vector2d = require('graphit/math/vector2dAB');

    function VECTOR2D() {
        this.__namespace__ = 'graphit/test/vector2d';
    }

    VECTOR2D.prototype.run = function() {

    };

    function test_fn(name) {
        var args = arguments;
        function outer() {
            var a = new Vector2d();
            var b = new Vector2d();
            a.randomize();
            b.randomize();
            var fn = undefined;
            if (name == 'fromPoints') {
                fn = function() {
                    return a.fromPoints(args[0], args[1]);
                };
            } else {
                fn = function() {
                    return a[name](b);
                };
            }
            return util.testFunction('Vector2dAB', name, fn);
        }
        // setTimeout(outer, 0);
        outer();
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
    VECTOR2D.prototype.test_clone = function() {
        test_fn('clone');
    };
    VECTOR2D.prototype.test_fromPoints = function() {
        var a = new graphit.math.vector2d();
        a.randomize();
        var b = new graphit.math.vector2d();
        b.randomize();
        test_fn('fromPoints', a, b);
    };

    VECTOR2D.prototype.test_length = function() {
        var r1 = test_fn('length');
        var r2 = test_fn('lengthSlow');
        var a = new graphit.math.vector2d();
        a.randomize();
        util.log('Length norm/slow', a.length(), a.lengthSlow());
    };

    VECTOR2D.prototype.test_randomize = function() {
        test_fn('randomize');
    };
    return new VECTOR2D();
});
