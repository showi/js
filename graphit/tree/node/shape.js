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
    var eShape = require('graphit/enum/shape');
    var eCap = require('graphit/enum/capability');
    var util = require('graphit/util');
    var tree = require('graphit/tree/util');
    var TransMixin = require('graphit/tree/mixin/transform');
    var ParamMixin = require('graphit/mixin/parameter');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');

    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'shape';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var VALIDATORS = {
        kind : {
            required : true
        },
        position: {
            required: false,
        },
        size: {
            required: true,
        },
    };

    function SHAPE() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/shape';
        this.setParameters(arguments, VALIDATORS);
        tree.setCapability(this, eCap.draw);
        this.setUp(this.kind);
    };
    //ParamMixin.call(SHAPE.prototype);
    SHAPE.prototype = Object.create(Node.prototype);
    TransMixin.call(SHAPE.prototype);
    
    SHAPE.prototype.setUp = function(kind) {
        if (this.position === undefined) {
            this.position = new Vector2d(0, 0);
        }
        var meth = 'setUp_' + kind;
        console.log('exec', meth);
        return this[meth]();
    };

    SHAPE.prototype.setUp_line = function() {
        console.log('Setting up line:');
    };

    SHAPE.prototype.setUp_rectangle = function() {
        console.log('Setting up rectangle:');
    };

    SHAPE.prototype.draw = function(renderer) {
        var meth = 'draw_' + this.kind;
        return this[meth](renderer);
    };

    SHAPE.prototype.draw_line = function(renderer) {
        var dSize = this.size / 2;
        shape.line(renderer.ctx, -dSize, 0, dSize, 0);
    };

    SHAPE.prototype.draw_rectangle = function(renderer) {
        var dWidth = this.size.x / 2;
        var dHeight = this.size.y / 2;
        shape.rectangle(renderer.ctx, -dWidth, -dHeight, dWidth, dHeight);
    };


//    util.injectMixin(SHAPE, ParamMixin);
//    util.injectMixin(SHAPE, TransMixin);
    ns[_ns_] = SHAPE;
    return ns[_ns_];
});
