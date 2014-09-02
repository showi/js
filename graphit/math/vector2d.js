define(function(require) {
 
    function VECTOR2D(x, y) {
        this.x = (x === undefined)? 0: x;
        this.y = (y === undefined)? 0: y;
    }
    
    VECTOR2D.prototype.clone = function() {
        return new VECTOR2D(this.x, this.y);
    };
    
    VECTOR2D.prototype.copy = function(v) {
        this.x = v.x;
        this.y = v.y;
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
        return new b.clone().sub(a);
    };
    
    VECTOR2D.prototype.toString = function() {
        return '<Vector2d x=' + this.x + ', y=' + this.y + '>';
    };
    return VECTOR2D;
});