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

    /* Importing our modules */
    var Vector3d = require('graphit/math/vector3d');
    var eType = require('graphit/enum/type');
    var math = require('graphit/math');
    var InvalidArraySizeError = require('graphit/exception/invalidarraysize');

    /* Matrix cell indexes */
    var m11 = 0;
    var m12 = 1;
    var m13 = 2;
    var m14 = 3;

    var m21 = 4;
    var m22 = 5;
    var m23 = 6;
    var m24 = 7;

    var m31 = 8;
    var m32 = 9;
    var m33 = 10;
    var m34 = 11;

    var m41 = 12;
    var m42 = 13;
    var m43 = 14;
    var m44 = 15;

    var mX = m14;
    var mY = m24;
    var mZ = m34;

    var sX = m11;
    var sY = m22;
    var sZ = m33;

    function MATRIX44(matrix) {
        /*
         * Constructor
         * 
         * @param matrix: If defined we are copying data
         */
        this.type = eType.matrix44;
        this.setUp(matrix);
    };
     MATRIX44.__namespace__ = 'graphit/math/matrix44';

    MATRIX44.prototype.New = function(matrix) {
        return new MATRIX44(matrix);
    };

    MATRIX44.prototype.setUp = function(matrix) {
        if (matrix === undefined) {
            this._data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        } else {
            this._data = [];
            if (matrix instanceof Array) {
                this.setData(matrix);
            } else {
                this.copy(matrix);
            }
        }
    };

    MATRIX44.prototype.setData = function(data) {
        if (data.length != 16) throw new InvalidArraySizeError(data.length);
        this._data[0] = data[0];
        this._data[1] = data[1];
        this._data[2] = data[2];
        this._data[3] = data[3];
        this._data[4] = data[4];
        this._data[5] = data[5];
        this._data[6] = data[6];
        this._data[7] = data[7];
        this._data[8] = data[8];
        this._data[9] = data[9];
        this._data[10] = data[10];
        this._data[11] = data[11];
        this._data[12] = data[12];
        this._data[13] = data[13];
        this._data[14] = data[14];
        this._data[15] = data[15];
        return this;
    };

    MATRIX44.prototype.copy = function(matrix) {
        /*
         * Copying matrix data from source
         * 
         * @param matrix: Source for copying @return: this for chaining
         */
        this._data[0] = matrix._data[0];
        this._data[1] = matrix._data[1];
        this._data[2] = matrix._data[2];
        this._data[3] = matrix._data[3];
        this._data[4] = matrix._data[4];
        this._data[5] = matrix._data[5];
        this._data[6] = matrix._data[6];
        this._data[7] = matrix._data[7];
        this._data[8] = matrix._data[8];
        this._data[9] = matrix._data[9];
        this._data[10] = matrix._data[10];
        this._data[11] = matrix._data[11];
        this._data[12] = matrix._data[12];
        this._data[13] = matrix._data[13];
        this._data[14] = matrix._data[14];
        this._data[15] = matrix._data[15];
        return this;
    };

    MATRIX44.prototype.clone = function() {
        /*
         * Return new matrix with same data
         * 
         * @return: new Matrix44 object
         */
        // return this.Create(this._data);
        return new MATRIX44(this);
    };

    MATRIX44.prototype.equal = function(matrix) {
        // this.inputFilterMatrix(matrix);
        for (var i = 0; i < 15; i++) {
            if (this._data[i] != matrix._data[i]) { return false; }
        }
        return true;
    };

    MATRIX44.prototype.fill = function(value) {
        // this.inputFilter(value);
        /*
         * Fill matrix with some value
         * 
         * @param value: used to fill matrix cell, if not defined default to 0
         * @return: this for chaining
         */
        if (value === undefined) {
            value = 0;
        }
        this._data[0] = value;
        this._data[1] = value;
        this._data[2] = value;
        this._data[3] = value;
        this._data[4] = value;
        this._data[5] = value;
        this._data[6] = value;
        this._data[7] = value;
        this._data[8] = value;
        this._data[9] = value;
        this._data[10] = value;
        this._data[11] = value;
        this._data[12] = value;
        this._data[13] = value;
        this._data[14] = value;
        this._data[15] = value;
        return this;
    };

    MATRIX44.prototype.identity = function() {
        /*
         * Reset matrix to identity
         */
        this._data[1] = this._data[2] = this._data[3] = this._data[5] = this._data[6] = this._data[7] = this._data[8] = this._data[9] = this._data[11] = this._data[12] = this._data[13] = this._data[14] = 0;
        this._data[0] = this._data[5] = this._data[10] = this._data[15] = 1;
        return this;
    };

    MATRIX44.prototype.translate = function(vector) {
        this._data[mX] += vector.x;
        this._data[mY] += vector.y;
        this._data[mZ] += vector.z;
        return this;
    };

    MATRIX44.prototype.translateX = function(x) {
        this._data[mX] += x;
        return this;
    };

    MATRIX44.prototype.translateY = function(y) {
        this._data[mY] += y;
        return this;
    };

    MATRIX44.prototype.translateZ = function(z) {
        this._data[mZ] += z;
        return this;
    };

    MATRIX44.prototype.translateXYZ = function(x, y, z) {
        this._data[mX] += x;
        this._data[mY] += y;
        this._data[mZ] += z;
        return this;
    };

    MATRIX44.prototype.position = function(vector) {
        if (vector === undefined) { return new Vector3d(this._data[mX],
                                                        this._data[mY], this._data[mZ]); }
        this._data[mX] = vector.x;
        this._data[mY] = vector.y;
        this._data[mZ] = vector.z;
        return this;
    };

    MATRIX44.prototype.positionX = function(x) {
        if (x === undefined) { return this._data[mX]; }
        this._data[mX] = x;
        return this;
    };

    MATRIX44.prototype.positionY = function(y) {
        if (y === undefined) { return this._data[mY]; }
        this._data[mY] = y;
        return this;
    };

    MATRIX44.prototype.positionZ = function(z) {
        if (z === undefined) { return this._data[mZ]; }
        this._data[mZ] = z;
        return this;
    };

    MATRIX44.prototype.positionXY = function(x, y, z) {
        this._data[mX] = x;
        this._data[mY] = y;
        this._data[mZ] = z;
        return this;
    };

    MATRIX44.prototype.rotateZ = function(angle) {
        angle = math.degToRad(angle);
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var r = new MATRIX44([cos, -sin, 0, 0, 
                              sin,  cos, 0, 0, 
                              0,      0, 1, 0, 
                              0,      0, 0, 1]);
//        this._data[0] *= cos;
//        this._data[1] *= -sin;
//        this._data[4] *= sin;
//        this._data[5] *= cos;
        this.mul(r);
        return this;
    };

    MATRIX44.prototype.angle = function() {
        throw 'NotImplemented';
    };

    MATRIX44.prototype.determinant = function() {
        throw 'NotImplemented';
    };

    MATRIX44.prototype.mul = function(matrix) {
        var a = matrix._data;
        var b = this.clone()._data;

        // First row
        this._data[m11] = a[m11] * b[m11] + a[m12] * b[m21] + a[m13] * b[m31]
                + a[m14] * b[m41];
        this._data[m12] = a[m11] * b[m12] + a[m12] * b[m22] + a[m13] * b[m32]
                + a[m14] * b[m42];
        this._data[m13] = a[m11] * b[m13] + a[m12] * b[m23] + a[m13] * b[m33]
                + a[m14] * b[m43];
        this._data[m14] = a[m11] * b[m14] + a[m12] * b[m24] + a[m13] * b[m34]
                + a[m14] * b[m44];

        // Second row
        this._data[m21] = a[m21] * b[m11] + a[m22] * b[m21] + a[m23] * b[m31]
                + a[m24] * b[m41];
        this._data[m22] = a[m21] * b[m12] + a[m22] * b[m22] + a[m23] * b[m32]
                + a[m24] * b[m42];
        this._data[m23] = a[m21] * b[m13] + a[m22] * b[m23] + a[m23] * b[m33]
                + a[m24] * b[m43];
        this._data[m24] = a[m21] * b[m14] + a[m22] * b[m24] + a[m23] * b[m34]
                + a[m24] * b[m44];

        // Third row
        this._data[m31] = a[m31] * b[m11] + a[m32] * b[m21] + a[m33] * b[m31]
                + a[m34] * b[m41];
        this._data[m32] = a[m31] * b[m12] + a[m32] * b[m22] + a[m33] * b[m32]
                + a[m34] * b[m42];
        this._data[m33] = a[m31] * b[m13] + a[m32] * b[m23] + a[m33] * b[m33]
                + a[m34] * b[m43];
        this._data[m34] = a[m31] * b[m14] + a[m32] * b[m24] + a[m33] * b[m34]
                + a[m34] * b[m44];

        // Third row
        this._data[m41] = a[m41] * b[m11] + a[m42] * b[m21] + a[m43] * b[m31]
                + a[m44] * b[m41];
        this._data[m42] = a[m41] * b[m12] + a[m42] * b[m22] + a[m43] * b[m32]
                + a[m44] * b[m42];
        this._data[m43] = a[m41] * b[m13] + a[m42] * b[m23] + a[m43] * b[m33]
                + a[m44] * b[m43];
        this._data[m44] = a[m41] * b[m14] + a[m42] * b[m24] + a[m43] * b[m34]
                + a[m44] * b[m44];

        return this;
    };

    MATRIX44.prototype.add = function(matrix) {
        // this.inputFilterMatrix(matrix);
        this._data[m11] += matrix._data[m11];
        this._data[m12] += matrix._data[m12];
        this._data[m13] += matrix._data[m13];
        this._data[m21] += matrix._data[m21];
        this._data[m22] += matrix._data[m22];
        this._data[m23] += matrix._data[m23];
        this._data[m31] += matrix._data[m31];
        this._data[m32] += matrix._data[m32];
        this._data[m33] += matrix._data[m33];
        return this;
    };

    MATRIX44.prototype.sub = function(matrix) {
        // this.inputFilterMatrix(matrix);
        this._data[m11] -= matrix._data[m11];
        this._data[m12] -= matrix._data[m12];
        this._data[m13] -= matrix._data[m13];
        this._data[m21] -= matrix._data[m21];
        this._data[m22] -= matrix._data[m22];
        this._data[m23] -= matrix._data[m23];
        this._data[m31] -= matrix._data[m31];
        this._data[m32] -= matrix._data[m32];
        this._data[m33] -= matrix._data[m33];
        return this;
    };

    MATRIX44.prototype.inverse = function() {
        throw 'NotImplemented';
    };

    MATRIX44.prototype.toString = function() {
        var o = "<Matrix44(" + MATRIX44.__namespace__ + ")>\n";
        for (var i = 0; i < 16; i += 4) {
            o += this._data[i] + ' ' + this._data[i + 1] + ' '
                    + this._data[i + 2] + ' ' + this._data[i + 3];
            o += "\n";
        }
        o += "\n";
        return o;
    };

    MATRIX44.prototype.vMul = function(vector) {
        // this.inputFilterVector(vector);
        var r = new Vector3d();
        r.x = this._data[m11] * vector.x + this._data[m12] * vector.y
                + this._data[m13];
        r.y = this._data[m21] * vector.x + this._data[m22] * vector.y
                + this._data[m23];
        return r;
    };

    MATRIX44.prototype.scale = function(scale) {
        this._data[sX] = scale;
        this._data[sY] = scale;
        this._data[sZ] = 1;
        return this;
    };
    console.log('PLOP', MATRIX44);
    return MATRIX44;
});
