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

    var math = require('graphit/math');
    var eType = require('graphit/enum/type');

    function VECTOR3D(x, y, z) {
        this.type = eType.vector3d;
        this.setUp(x, y, z);
    }
    VECTOR3D.__namespace__ = 'graphit/math/vector3d';

    VECTOR3D.prototype.clone = function() {
        // return this.Create(this.x, this.y, this.z);
        return new VECTOR3D(this.x, this.y, this.z);
    };

    VECTOR3D.prototype.setUp = function(x, y, z) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
        this.z = (z === undefined) ? 0 : z;
    };

    VECTOR3D.prototype.New = function(x, y, z) {
        return new VECTOR3D(x, y, z);
    };

    VECTOR3D.prototype.copy = function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    };

    VECTOR3D.prototype.normalize = function() {
        var l = this.length();
        this.x /= l;
        this.y /= l;
        this.z /= l;
        return this;
    };

    VECTOR3D.prototype.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    };

    VECTOR3D.prototype.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    };

    VECTOR3D.prototype.smul = function(value) {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    };

    VECTOR3D.prototype.inverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    };
    VECTOR3D.prototype.inverseX = function() {
        this.x = -this.x;
        return this;
    };
    VECTOR3D.prototype.inverseY = function() {
        this.y = -this.y;
        return this;
    };

    VECTOR3D.prototype.inverseZ = function() {
        this.z = -this.z;
        return this;
    };

    VECTOR3D.prototype.mul = function(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        return this;
    };

    VECTOR3D.prototype.div = function(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;
        return this;
    };

    VECTOR3D.prototype.fromPoints = function(a, b) {
        var vector = b.clone().sub(a);
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        vector.Delete();
        return this;
    };

    VECTOR3D.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    };

    VECTOR3D.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    };

    VECTOR3D.prototype.clamp = function(min, max) {
        this.x = math.clamp(this.x, min, max);
        this.y = math.clamp(this.y, min, max);
        this.z = math.clamp(this.z, min, max);
        return this;
    };

    VECTOR3D.prototype.toString = function() {
        return '<Vector3d x=' + this.x + ', y=' + this.y + ', z=' + this.z
                + '>';
    };

    VECTOR3D.prototype.randomize = function() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    };

    VECTOR3D.prototype.length = function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y)
                + (this.z * this.z));
    };

    VECTOR3D.prototype.lengthSlow = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)
                + Math.pow(this.z, 2));
    };

    return VECTOR3D;
});
