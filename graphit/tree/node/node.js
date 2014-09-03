/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
*/
define(function(require) {

    'use strict';

    var util = require('graphit/util');
    var namespace = require('graphit/namespace');
    var ns = namespace.tree.node;
    var _ns_ = 'node';
    
    if (_ns_ in ns && ns !== undefined) { return ns[_ns_]; }

    function NODE() {
        this.__namespace__ = 'graphit/tree/node/node';
        this.uid = namespace.genuid();
        this.child = [];
        this.capability = 0;
        var parent = arguments[0] === undefined? undefined: arguments[0];
//        if (!(this instanceof NODE)) { return new NODE(parent); }
        if (!NODE.prototype.parent) {
            util.injectProperties(NODE, ['parent', 'traversable']);
        }
        this.parent(parent);
        this.traversable(true);
    };

    NODE.prototype.appendChild = function(child) {
        child.parent = this;
        this.child.push(child);
    };

    NODE.prototype.preTraverse = function(fn) {
        fn(this);
        for (var i = 0; i < this.child.length; i++) {
            this.child[i].preTraverse(fn);
        }
    };

    NODE.prototype.postTraverse = function(fn) {
        for (var i = 0; i < this.child.length; i++) {
            var child = this.child[i];
            child.postTraverse(fn);
        }
        fn(this);
    };

    NODE.prototype.log = function(msg) {
        console.log(this.__namespace__, this.uid, msg);
    };

    NODE.prototype.toString = function() {
        return '<Node uid="'+this.uid+'" childs="'+this.child.length+'">';
    };

    ns[_ns_] = NODE;
    return ns[_ns_];
});
