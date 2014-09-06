define(function(require) {
    
    var GArray = require('graphit/datatype/array');

    
    function ARRAY() {
        this.__namespace__ = 'graphit/test/array';
    }

    ARRAY.prototype.run = function() {
        var a = new GArray();
        a.push([1,2,3,4]);
        console.log('a', a.toString(), a);
    };

    return new ARRAY();
});
