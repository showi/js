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

    /* Matrix cell indexes */
    var m11 = 0;
    var m12 = 1;
    var m13 = 2;
    var m21 = 3;
    var m22 = 4;
    var m23 = 5;
    var m31 = 6;
    var m32 = 7;
    var m33 = 8;

    var mX = m13;
    var mY = m23;

    var sX = m11;
    var sY = m22;
    var sZ = m33;

    function MATRIX33(matrix) {
        /*
         * Constructor
         * 
         * @param matrix: If defined we are copying data
         */
        this.type = eType.matrix33;
        this.setUp(matrix);
    }
    MATRIX33.__namespace__ = 'graphit/math/matrix33';

    MATRIX33.prototype.New = function(matrix) {
        return new MATRIX33(matrix);
    };

    MATRIX33.prototype.setUp = function(matrix) {
        if (matrix === undefined) {
            this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        } else {
            this._data = [];
            if (matrix instanceof Array) {
                this.setData(matrix);
            } else {
                this.copy(matrix);
            }
        }
    };

    MATRIX33.prototype.setData = function(data) {
        if (data.length != 9) { throw 'InvalidMatrix33DataSize(' + data.length
                + ')'; }
        this._data[0] = data[0];
        this._data[1] = data[1];
        this._data[2] = data[2];
        this._data[3] = data[3];
        this._data[4] = data[4];
        this._data[5] = data[5];
        this._data[6] = data[6];
        this._data[7] = data[7];
        this._data[8] = data[8];
        return this;
    };

    MATRIX33.prototype.copy = function(matrix) {
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

        return this;
    };

    MATRIX33.prototype.clone = function() {
        /*
         * Return new matrix with same data
         * 
         * @return: new Matrix33 object
         */
        //        return this.Create(this._data);
        return new MATRIX33(this);
    };

    MATRIX33.prototype.equal = function(matrix) {
        // this.inputFilterMatrix(matrix);
        for (var i = 0; i < 9; i++) {
            if (this._data[i] != matrix._data[i]) { return false; }
        }
        return true;
    };

    MATRIX33.prototype.fill = function(value) {
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
        this._data[m11] = value;
        this._data[m12] = value;
        this._data[m13] = value;
        this._data[m21] = value;
        this._data[m22] = value;
        this._data[m23] = value;
        this._data[m31] = value;
        this._data[m32] = value;
        this._data[m33] = value;
        return this;
    };

    MATRIX33.prototype.fillSlow = function(value) {
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
        this._data = [value, value, value, value, value, value, value, value,
                      value];
        return this;
    };

    MATRIX33.prototype.fillMedium = function(value) {
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
        this._data[m11] = this._data[m12] = this._data[m13] = this._data[m21] = this._data[m22] = this._data[m23] = this._data[m31] = this._data[m32] = this._data[m33] = value;
        return this;
    };

    MATRIX33.prototype.identity = function() {
        /*
         * Reset matrix to identity
         */
        this._data[m12] = this._data[m13] = this._data[m21] = this._data[m23] = this._data[m31] = this._data[m32] = 0;
        this._data[m11] = this._data[m22] = this._data[m33] = 1;
        return this;
    };

    MATRIX33.prototype.identitySlow = function() {
        this.fill(0);
        this._data[m11] = this._data[m22] = this._data[m33] = 1;
        return this;
    };

    MATRIX33.prototype.identityMedium = function() {
        this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return this;
    };

    MATRIX33.prototype.translate = function(vector) {
        // this.inputFilterVector(vector);
        this._data[mX] += vector.x;
        this._data[mY] += vector.y;
        return this;
    };

    MATRIX33.prototype.translateX = function(x) {
        // this.inputFilter(x);
        this._data[mX] += x;
        return this;
    };

    MATRIX33.prototype.translateY = function(y) {
        // this.inputFilter(y);
        this._data[mY] += y;
        return this;
    };

    MATRIX33.prototype.translateXY = function(x, y) {
        // this.inputFilter(x, y);
        this._data[mX] += x;
        this._data[mY] += y;
        return this;
    };

    MATRIX33.prototype.position = function(vector) {
        if (vector === undefined) { return new Vector3d(this._data[mX],
                                                        this._data[mY]); }
        // this.inputFilter(vector);
        this._data[mX] = vector.x;
        this._data[mY] = vector.y;
        return this;
    };

    MATRIX33.prototype.positionX = function(x) {
        if (x === undefined) { return this._data[mX]; }
        // this.inputFilter(x);
        this._data[mX] = x;
        return this;
    };

    MATRIX33.prototype.positionY = function(y) {
        if (y === undefined) { return this._data[mY]; }
        // this.inputFilter(y);
        this._data[mY] = y;
        return this;
    };

    MATRIX33.prototype.positionXY = function(x, y) {
        // this.inputFilter(x, y);
        this._data[mX] = x;
        this._data[mY] = y;
        return this;
    };

    MATRIX33.prototype.rotateZ = function(angle) {
        angle = math.degToRad(angle);
        console.log('angle', angle);

        // console.log('rotate/angle', angle);
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var r = new MATRIX33([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
        this.mul(r);
        return this;
    };

    MATRIX33.prototype.angle = function() {
        // console.log(this._data);
        var term = (this._data[m11] + this._data[m22] + this._data[m33] - 1) / 2;
        // console.log('term', term);
        var angle = Math.acos(term);
        // console.log('angle', angle);
        return angle;
    };
    MATRIX33.prototype.determinant = function() {
        return ((this._data[m11] * this._data[m13] * this._data[m33])
                + (this._data[m12] * this._data[m23] * this._data[m31]) + (this._data[m13]
                * this._data[m21] * this._data[m32]))
                - ((this._data[m13] * this._data[m22] * this._data[m31])
                        - (this._data[m12] * this._data[m21] * this._data[m33]) - (this._data[m11]
                        * this._data[m23] * this._data[m32]));
    };

    MATRIX33.prototype.mul = function(matrix) {
        var a = matrix._data;
        var b = this.clone()._data;
        this._data[m11] = a[m11] * b[m11] + a[m12] * b[m21] + a[m13] * b[m31];
        this._data[m12] = a[m11] * b[m12] + a[m12] * b[m22] + a[m13] * b[m32];
        this._data[m13] = a[m11] * b[m13] + a[m12] * b[m23] + a[m13] * b[m33];
        // Second row
        this._data[m21] = a[m21] * b[m11] + a[m22] * b[m21] + a[m23] * b[m31];
        this._data[m22] = a[m21] * b[m12] + a[m22] * b[m22] + a[m23] * b[m32];
        this._data[m23] = a[m21] * b[m13] + a[m22] * b[m23] + a[m23] * b[m33];
        // Third row
        this._data[m31] = a[m31] * b[m11] + a[m32] * b[m21] + a[m33] * b[m31];
        this._data[m32] = a[m31] * b[m12] + a[m32] * b[m22] + a[m33] * b[m32];
        this._data[m33] = a[m31] * b[m13] + a[m32] * b[m23] + a[m33] * b[m33];
        //        aClone.Delete();
        return this;
    };

    MATRIX33.prototype.add = function(matrix) {
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

    MATRIX33.prototype.sub = function(matrix) {
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

    MATRIX33.prototype.inverse = function() {
        throw 'NotImplemented';
    };

    MATRIX33.prototype.toString = function() {
        var o = "<Matrix33(" + this.__namespace__ + ")>\n";
        for (var i = 0; i < 9; i += 3) {
            o += this._data[i] + ' ' + this._data[i + 1] + ' '
                    + this._data[i + 2];
            o += "\n";
        }
        o += "\n";
        return o;
    };

    MATRIX33.prototype.vMul = function(vector) {
        // this.inputFilterVector(vector);
        var r = new Vector2d();
        r.x = this._data[m11] * vector.x + this._data[m12] * vector.y
                + this._data[m13];
        r.y = this._data[m21] * vector.x + this._data[m22] * vector.y
                + this._data[m23];
        return r;
    };

    MATRIX33.prototype.scale = function(scale) {
        this._data[sX] = scale;
        this._data[sY] = scale;
        this._data[sZ] = 1;
        return this;
    };

    //    InputFilterMixin.call(MATRIX33.prototype);

    //    var m = new MATRIX33();
    //    m.Delete();

    return MATRIX33;
});
