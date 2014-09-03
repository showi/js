define(function(require) {

    var util = require('graphit/util');
    var ns = require('graphit/namespace');
    var _ns_ = 'node';

    if (_ns_ in ns.tree.node && ns.tree.node !== undefined) { return ns.tree.node[_ns_]; }

    function NODE(parent) {
        this.__namespace__ = 'graphit/tree/node/node';
        this.uid = ns.genuid();
        this.childs = [];
        this.capability = 0;
        if (!(this instanceof NODE)) { return new NODE(parent); }
        if (!NODE.prototype.parent) {
            util.injectProperties(NODE, ['parent', 'traversable']);
        }
        this.parent(parent);
        this.traversable(true);
    };

    NODE.prototype.appendChild = function(child) {
        child.parent = this;
        this.childs.push(child);
    };

    NODE.prototype.preTraverse = function(fn) {
        fn(this);
        if (!this.traversable()) { return; }
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].preTraverse(fn);
        }
    };

    NODE.prototype.postTraverse = function(fn) {
        for (var i = 0; i < this.childs.length; i++) {
            var child = this.childs[i];
            child.postTraverse(fn);
        }
        fn(this);
    };
    NODE.prototype.log = function(msg) {
        console.log(this.__namespace__, this.uid, msg);
    };
    
    ns.tree.node[_ns_] = NODE;
    return ns.tree.node[_ns_];
});
