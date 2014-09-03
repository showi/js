define(function(require) {
 
    var Node = require('./node');
    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'element';
    
    if (_ns_ in ns && ns !== undefined) {
        return ns[_ns_];
    }

    function ELEMENT() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/element';
    };
    ELEMENT.prototype = Object.create(Node.prototype);

    ns[_ns_] = ELEMENT;
    return ns[_ns_];
});