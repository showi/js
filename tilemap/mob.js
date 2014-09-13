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

    var Vector2d = require('graphit/math/vector2d');
    var tool = require('graphit/draw/tool');
    var math = require('graphit/math');

    function Mob(x, y, texture) {
        this.position = new Vector2d(x, y);
        this.texture = texture;
        this.fillStyle = tool.randomColor();
        this.velocity = new Vector2d(0.1,0.1);
        this.orientation = new Vector2d();
        this.orientation.randomize().normalize();
    }   
    
    Mob.prototype.draw = function(ctx) {
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(-32, -32, 64, 64);
        ctx.restore();
    };
    
    return Mob;
});