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

    var ns = require('graphit/math');
    var _ns_ = 'vector2dAB';
    var math = require('graphit/math');
//    var eVector = require('graphit/enum/vector');
 
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var mX = 0;
    var mY = 1;
    
    function VECTOR2D(x, y) {
        x = (x === undefined) ? 0 : x;
        y = (y === undefined) ? 0 : y;
        this._data = new Float32Array([x, y]);
        Object.defineProperty(this, 'x', {
            get: function() {
                return this._data[mX];
            },
            set: function(v) {
                this._data[mX] = v;
            }
        });

        Object.defineProperty(this, 'y', {
            get: function() {
                return this._data[mY];
            },
            set: function(v) {
                this._data[mY] = v;
            }
        }); 
    }
    
  
  
    
    VECTOR2D.__namespace__ = 'graphit/math/vector2dAB';
        
    VECTOR2D.prototype.clone = function() {
        return new VECTOR2D(this.x, this.y);
    };

    VECTOR2D.prototype.copy = function(vector) {
        this._data[mX] = vector[mX];
        this._data[mY] = vector[mY];
        return this;
    };
    
    VECTOR2D.prototype.normalize = function() {
        var l = this.length();
        this._data[mX] /= l;
        this._data[mY] /= l;
        return this;
    };

    VECTOR2D.prototype.add = function(vector) {
        this._data[0] += vector[0];
        this._data[1] += vector[1];
        return this;
    };

    VECTOR2D.prototype.sub = function(vector) {
        this._data[mX] -= vector[mX];
        this._data[mY] -= vector[mY];
        return this;
    };

    VECTOR2D.prototype.smul = function(value) {
        this._data[mX] *= value;
        this._data[mY] *= value;
        return this;
    };

    VECTOR2D.prototype.inverse = function() {
        this._data[mX] = -this._data[mX];
        this._data[mY] = -this._data[mY];
        return this;
    };
    VECTOR2D.prototype.inverseX = function() {
        this._data[mX] = -this._data[mX];
        return this;
    };
    VECTOR2D.prototype.inverseY = function() {
        this._data[mX] = -this._data[mY];
        return this;
    };

    VECTOR2D.prototype.mul = function(vector) {
        this._data[mX] *= vector[mX];
        this._data[mY] *= vector[mY];
        return this;
    };

    VECTOR2D.prototype.div = function(vector) {
        this._data[mX] /= vector[mX];
        this._data[mY] /= vector[mY];
        return this;
    };

    VECTOR2D.prototype.fromPoints = function(a, b) {
        var vector = b.clone().sub(a);
        this._data[mX] = vector[mX];
        this._data[mY] = vector[mY];
        return this;
    };
    VECTOR2D.prototype.floor = function() {
        this._data[mX] = Math.floor(this._data[mX]);
        this._data[mY] = Math.floor(this._data[mY]);
        return this;
    };
    VECTOR2D.prototype.round = function() {
        this._data[mX] = Math.round(this._data[mX]);
        this._data[my] = Math.round(this._data[mY]);
        return this;
    };
    
    VECTOR2D.prototype.clamp = function(min, max) {
        this._data[mX] = math.clamp(this._data[mX], min, max);
        this._data[mY] = math.clamp(this._data[mY], min, max);
        return this;
    };

    VECTOR2D.prototype.toString = function() {
        return '<Vector2d x=' + this._data[mX] + ', y=' + this._data[mY] + '>';
    };

    VECTOR2D.prototype.randomize = function() {
        this._data[mX] = Math.random();
        this._data[mY] = Math.random();
        return this;
    };

    VECTOR2D.prototype.length = function() {
        return Math.sqrt((this._data[mX] * this._data[mX]) + (this._data[mY] * this._data[mY]));
    };

    VECTOR2D.prototype.lengthSlow = function() {
        return Math.sqrt(Math.pow(this._data[mX], 2) + Math.pow(this._data[mY], 2));
    };

    ns[_ns_] = VECTOR2D;
    return ns[_ns_];
});
