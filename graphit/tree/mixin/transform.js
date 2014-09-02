define(function(require) {

    var eCap = require('graphit/tree/enum/capability');
    var util = require('graphit/tree/util');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');

    function TRANSFORM() {
        console.log('Setting tranform capability', this);
        util.setCapability(this, eCap.transform);
        this.matrix = new Matrix33();
        this.position = new Vector2d();
    };

    TRANSFORM.prototype.rotate = function(angle) {
        this.matrix.rotate(angle);
    };

    TRANSFORM.prototype.translate = function(vector) {
        this.matrix.translate(vector);
    };
    return TRANSFORM;
});