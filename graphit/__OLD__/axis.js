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

    var Node = require('graphit/scene/node/node');
    var eCap = require('graphit/enum/capability');
    var tree = require('graphit/scene/util');
    var TransMixin = require('graphit/scene/mixin/transform');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');
    var eAxis = require('graphit/enum/axis');

    var VALIDATORS = {
        kind : {
            required : true
        },
        pos : {
            required : false,
        },
        size : {
            required : true,
        },
    };

    function AXIS(position) {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/scene/node/axis';
        this.setParameters(arguments, VALIDATORS);
        tree.setCapability(this, eCap.draw);
        this.enable_transform();
        this.setUp(this.kind);
    };

    AXIN.prototype = Object.create(Node.prototype);
    TransMixin.call(SHAPE.prototype);

    AXIN.prototype.setUp = function(kind) {
        this.u = new Vector2d(1, 0);
        this.v = new Vector2d(0, 1);
    };

    AXIN.prototype.draw_rectangle = function(renderer) {
        
    };

    return SHAPE;
});
