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
    
    var Vector2dObj = require('graphit/math/vector2d');
    var Storeable = require('graphit/storeable');
    var eType = require('graphit/enum/type');

    var Vector2d = new Vector2dObj();
    Vector2d.Delete();

    function RECT(left, top, width, height) {
        this.type = eType.rect;
        this.u = Vector2d.Create();
        this.v = Vector2d.Create(),
        this.center = Vector2d.Create();
        this.setUp(left, top, width, height);
        
        Object.defineProperty(this, 'position', {
            get: function() {
                return this.center.clone().sub(this.u).sub(this.v);
            },
            set: function(position) {
                this.center.add(position.clone().add(this.u).add(this.v));
            }
        });          
        Object.defineProperty(this, 'x', {
            get: function() {
                return this.center.x - this.u.x;
            },
            set: function(x) {
                this.center.x = x + this.u.x;
            }
        });
        Object.defineProperty(this, 'y', {
            get: function() {
                return this.center.y - this.v.y;
            },
            set: function(y) {
                this.center.y = y + this.u.y;
            }
        });
        Object.defineProperty(this, 'width', {
            get: function() {
                return this.u.x * 2;
            },
            set: function(width) {
                this.u.x = width / 2;
            }
        });
        Object.defineProperty(this, 'height', {
            get: function() {
                return this.v.y * 2;
            },
            set: function(height) {
                this.v.y = height / 2;
            }
        });
        
        Object.defineProperty(this, 'size', {
            get: function() {
                return Vector2d.Create(this.width, this.height);
            },
            set: function(size) {
                this.width = size.x;
                this.height = size.y;
            }
        });
        Object.defineProperty(this, 'max', {
            get: function() {
                return this.u.clone().sub(this.v);
            },
            set: function(max) {
                this.center.x += max.x / 2;
                this.center.y += max.y / 2;
                this.width += max.x;
                this.height += max.y;
            }
        });        
    };
    RECT.prototype = Object.create(Storeable.prototype);

    RECT.prototype.clone = function() {
        return this.Create(this.x, this.y, this.width, this.height);
    };
    
    RECT.prototype.copy = function(rect) {
        this.center.copy(rect.center);
        this.u.copy(rect.u);
        this.v.copy(rect.v);
    }
    RECT.prototype.New = function (left, top, width, height) {
        return new RECT(left, top, width, height);
    };

    RECT.prototype.setUp = function(left, top, width, height) {
        this.u.x = width / 2;
        this.u.y = 0;
        this.v.y = height / 2;
        this.v.x = 0;
        this.center.x = left + this.u.x;
        this.center.y = top + this.v.y;  
    };

    RECT.prototype.toString = function() {
        var s ='<Rect ';
        s+= 'position: ' + this.position + ",";
        s+= '>';
        return s
    }
    return RECT;
});