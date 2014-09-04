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

    function LAYER(max) {
        if (max === undefined) {
            max = 10;
        }
        this.max = max;
        this.setUp();
    }

    LAYER.prototype.setUp = function() {
        this.data = [];
        for (var i = 0; i < this.max; i++) {
            this.data[i] = null;
        }
    };

    LAYER.prototype.push = function(idx, node) {
        if (idx < 0 || idx > this.max) { throw 'LayerIndexRangeError(' + idx
                + ')'; }
        if (node === undefined || node == null) { throw 'Cannot add undefined or null node'; }
        if (this.data[idx] == null) {
            this.data[idx] = [];
        }
        this.data[idx].append(node);
    };

    LAYER.prototype.clear = function() {
        for (var i = 0; i < this.max; i++) {
            if (this.data[i] != null) {
                this.data[i] = [];
            }
        }
    };

    return LAYER;
});
