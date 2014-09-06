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

    var Node = require('./node');
    var Line = require('graphit/math/line');
    var ns = require('graphit/namespace');
    var shape = require('graphit/draw/shape');
    var util = require('graphit/tree/util');
    var eCap = require('graphit/enum/capability');
    var _ns_ = 'primitive';

    var CTX_PROPERTIES = {
        'fillStyle' : true,
        'strokeStyle' : true,
        'lineWidth' : true,
        'lineCap' : true,
        'lineJoin' : true,
    };

    function PRIMITIVE() {
        Node.call(this, arguments);
        util.setCapability(this, eCap.draw);
        this.traversable = false;
        this.primitive = [];
    };
    PRIMITIVE.prototype = Object.create(Node.prototype);
    PRIMITIVE.__namespace__ = 'graphit/tree/node/primitive';
    
    PRIMITIVE.prototype.addPrimitive = function(primitive) {
        if (primitive === undefined) { throw 'UndefinedPrimitive'; }
        this.primitive.push(primitive);
    };

    PRIMITIVE.prototype.iterPrimitive = function(fn) {
        for (var i = 0; i < this.primitive.length; i++) {
            fn(this.primitive[i]);
        }
    };

    PRIMITIVE.prototype.draw = function(renderer) {
        for (var i = 0; i < this.primitive.length; i++) {
            renderer.ctx.save();
            // try {
            var primitive = this.primitive[i];
            for ( var p in CTX_PROPERTIES) {
                if (p in primitive) {
                    renderer.ctx[p] = primitive[p];
                }
            }
            if (primitive instanceof Line) {
                this.drawLine(renderer, primitive);
            } else if (primitive instanceof Circle) {
                this.drawCircle(renderer, primitive);
            }
            renderer.ctx.restore();
        }
    };

    PRIMITIVE.prototype.drawLine = function(renderer, line) {
        shape.line(renderer.ctx, line.a.x, line.a.y, line.b.x, line.b.y);
    };

    PRIMITIVE.prototype.drawCircle = function(renderer, circle) {
        shape.circl(renderer.ctx, circle.x, circl.y, circle.radius);
    };

    ns.tree.node[_ns_] = PRIMITIVE;
    // return ns.tree.node[_ns_];
    return PRIMITIVE;
});
