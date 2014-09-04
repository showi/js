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

    function Node(obj) {
        this.parent = null;
        this.obj = obj;
        this.right = null;
        this.left = null;
    }

    function BINT() {
        this.root = null;
        this.node_key = 'value';
    }

    BINT.prototype.push(node)
    {
        if (node === undefined || node == null) { throw 'Cannot add undefined or null node'; }
        if (!(this.node_key in node) || node[this.node_key] === undefined) { throw 'No node_key['
                + this.node_key + '] in node'; }
        if (this.root == null) {
            this.root = node;
            return this;
        }
        var value = node[this.node_key];
        var last = this.root;
        while (last.left != null || last.right != null) {
            if (value > root.value) {
                last = last.right;
            } else {
                last = last.left;
            }
        }
    }
});
