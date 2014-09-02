define(function(require) {
 
    var Node = require('./node');
    var ns = require('graphit/global');
    var _ns_ = 'element';
    
    if (_ns_ in ns.tree.node && ns.tree.node !== undefined) {
        return ns.tree.node[_ns_];
    }

    function ELEMENT() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/element';
    };
    ELEMENT.prototype = Object.create(Node.prototype);

    ns.tree.node[_ns_] = ELEMENT;
    return ns.tree.node[_ns_];
});