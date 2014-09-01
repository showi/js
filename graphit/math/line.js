define(function(require) {
 
    function LINE(a, b) {
        this.__namespace__ = 'graphit/math/line';
        this.a = a;
        this.b = b;
    };

    return LINE;
});