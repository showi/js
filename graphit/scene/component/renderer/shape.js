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

    var Renderer = require('graphit/scene/component/renderer');
    var eShape = require('graphit/enum/shape');
    var shape = require('graphit/draw/shape');

    function ShapeRenderer() {
        Renderer.call(this, arguments);
    }
    ShapeRenderer.prototype = Object.create(Renderer.prototype);

    ShapeRenderer.prototype.draw = function(renderer, node) {
        var meth = 'draw_' + eShape.reverse(node.kind);
        return this[meth](renderer, node);
    };

    ShapeRenderer.prototype.draw_line = function(renderer, node) {
        var dSize = this.size / 2;
        shape.line(renderer.ctx, -dSize, 0, dSize, 0);
    };

    ShapeRenderer.prototype.draw_circle = function(renderer, node) {
        console.log('draw circle', renderer, node);
        shape.circle(renderer.ctx, 0, 0, node.u.x);
    };

    ShapeRenderer.prototype.draw_rectangle = function(renderer, node) {
        if (this.fillStyle !== undefined) {
            renderer.ctx.fillRect(-this.u.x, -this.v.y, this.u.x * 2,
                                  this.v.y * 2);
        }
        if (this.strokeStyle !== undefined) {
            renderer.ctx.strokeRect(-this.u.x, -this.v.y, this.u.x * 2,
                                    this.v.y * 2);
        }
    };

    return ShapeRenderer;
});
