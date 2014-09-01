define(function(require) {
 
    function VECTOR2D(x, y) {
        this.x = x;
        this.y = y;
    }
    
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
    VECTOR2D.protoype.clone = function() {
        return new VECTOR2D(this.x, this.y);
    };
    VECTOR2D.prototype.fromPoints = function(a, b) {
        return new b.clone().sub(a);
    };
    return VECTOR2D;
});