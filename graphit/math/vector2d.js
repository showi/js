define(function(require) {

    var ns = require('graphit/namespace');
    ns = ns.math;
    var _ns_ = 'vector2d';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function VECTOR2D(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }

    VECTOR2D.prototype.clone = function() {
        return new VECTOR2D(this.x, this.y);
    };

    VECTOR2D.prototype.copy = function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    };

    VECTOR2D.prototype.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };

    VECTOR2D.prototype.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };

    VECTOR2D.prototype.mul = function(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    };

    VECTOR2D.prototype.div = function(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    };

    VECTOR2D.prototype.fromPoints = function(a, b) {
        var vector = b.clone().sub(a);
        this.x = vector.x;
        this.y = vector.y;
        return this;
    };

    VECTOR2D.prototype.toString = function() {
        return '<Vector2d x=' + this.x + ', y=' + this.y + '>';
    };

    VECTOR2D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    };

    VECTOR2D.prototype.length = function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    VECTOR2D.prototype.lengthSlow = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    ns[_ns_] = VECTOR2D;
    return ns[_ns_];
});
