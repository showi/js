define(function(require) {
    
    var Point = require('graphit/geom/point2d');

    
    function ARRAY() {
        this.__namespace__ = 'graphit/test/geom2d';
        this.numPoint = 10;
    }

    ARRAY.prototype.run = function() {
        console.log('Creating points', this.numPoint);
        this.point = [];
        var point;
        for (var i = 0; i < this.numPoint, point = new Point(); i++) {
            point.randomize();
            this.point.append(point);
            console.log(point.toString());
        }
    };

    return new ARRAY();
});
