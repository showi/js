define(function(require) {
 
    var Node = require('graphit/tree/node');
 
    function ELEMENT() {
        this.__namespace__ = 'graphit/tree/node/element';
        Node.call(this, arguments);
    };
    ELEMENT.prototype = Object.create(Node.prototype);

    return ELEMENT;
});