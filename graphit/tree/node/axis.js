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

    var Node = require('graphit/tree/node/node');
    var eCap = require('graphit/enum/capability');
    var tree = require('graphit/tree/util');
    var TransMixin = require('graphit/tree/mixin/transform');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');
    var eAxis = require('graphit/enum/axis');

    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'shape';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var VALIDATORS = {
        kind : {
            required : true
        },
        position : {
            required : false,
        },
        size : {
            required : true,
        },
    };

    function SHAPE() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/shape';
        this.setParameters(arguments, VALIDATORS);
        tree.setCapability(this, eCap.draw);
        this.setUp(this.kind);
    };

    SHAPE.prototype = Object.create(Node.prototype);
    TransMixin.call(SHAPE.prototype);

    SHAPE.prototype.setUp = function(kind) {
        this.u = new Vector2d(1, 0);
        this.v = new Vector2d(0, 1);
    };

    SHAPE.prototype.draw_rectangle = function(renderer) {
        
    };

    ns[_ns_] = SHAPE;
    return ns[_ns_];
});