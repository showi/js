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
    
    var Circle = require('graphit/geom/circle2d');
    var Vector2d = require('graphit/math/vector3d');

    var Collision = function() {
        this.collide = false;
        this.x = null;
        this.y = null;
    };

    function CIRCLE2D(parent, radius) {
        this.parent = parent;
        this.radius = radius;
        Object.defineProperty(this, 'x', {
            get: function() {
                return this.parent.x;
            },
            set: function(x) {
                this.parent.x = x;
            },
        });
        Object.defineProperty(this, 'y', {
            get: function() {
                return this.parent.y;
            },
            set: function(y) {
                this.parent.y = y;
            },
        });
        
    }
    
    CIRCLE2D.prototype.collide = function (target) {
        if (!(target instanceof CIRCLED2D)) {
            throw 'UnknowCollideTarget';
        }
        var distance = math.distance(this.x, this.y, target.x, target.y); 
        if (distance < (this.radius + target.radius)) {
            return true, {};
        }
        return false;
    };

    return CIRCLE2D;
});