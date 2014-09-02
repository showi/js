define(function(require) {
 
    function POINT2D(x, y) {
        this.x = (x === undefined)? 0: x;
        this.y = (y === undefined)? 0: y;
    }
    
    POINT2D.protoype.clone = function() {
        return new POINT2(this.x, this.y);
    };
    
    POINT2D.prototype.copy = function(v) {
        this.x = v.x;
        this.y = v.y;
    };

    return POINT2D;
});