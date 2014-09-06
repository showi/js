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
    var _ns_ = 'vector2d';
    var math = require('graphit/math');

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function VECTOR2D(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }

    VECTOR2D.prototype.clone = function() {
        return new VECTOR2D(this.x, this.y);
    };

    VECTOR2D.prototype.copy = function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    };
    
    VECTOR2D.prototype.normalize = function() {
        var l = this.length();
        this.x /= l;
        this.y /= l;
        return this;
    };

    VECTOR2D.prototype.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };

    VECTOR2D.prototype.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };

    VECTOR2D.prototype.smul = function(value) {
        this.x *= value;
        this.y *= value;
        return this;
    };

    VECTOR2D.prototype.inverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };

    VECTOR2D.prototype.mul = function(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    };

    VECTOR2D.prototype.div = function(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    };

    VECTOR2D.prototype.fromPoints = function(a, b) {
        var vector = b.clone().sub(a);
        this.x = vector.x;
        this.y = vector.y;
        return this;
    };
    VECTOR2D.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    VECTOR2D.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    
    VECTOR2D.prototype.clamp = function(min, max) {
        this.x = math.clamp(this.x, min, max);
        this.y = math.clamp(this.y, min, max);
        return this;
    };

    VECTOR2D.prototype.toString = function() {
        return '<Vector2d x=' + this.x + ', y=' + this.y + '>';
    };

    VECTOR2D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    };

    VECTOR2D.prototype.length = function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    VECTOR2D.prototype.lengthSlow = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    ns[_ns_] = VECTOR2D;
    return ns[_ns_];
});
