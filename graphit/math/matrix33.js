define(function(require) {

    var ns = require('graphit/namespace');
    var _ns_ = 'matrix33';
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }
    var m11 = 0;
    var m12 = 1;
    var m13 = 2;
    var m21 = 3;
    var m22 = 4;
    var m23 = 5;
    var m31 = 6;
    var m32 = 7;
    var m33 = 8;

    function MATRIX33(matrix) {
        /* Constructor
         * 
         * @param matrix: If defined we are copying data
         */
        this.__namespace__ = 'graphit/math/matrix33';
        this._data = [1,0,0,
                      0,1,0,
                      0,0,1];
        //this.fill(0);
        if (matrix !== undefined) {
            this.copy(matrix);
        }
    };

    MATRIX33.prototype.copy = function(matrix) {
        /* Copying matrix data from source
         * 
         * @param matrix: Source for copying
         * @return: this for chaining
         * */
        for (var i = 0; i < 9; i++) {
            this._data[i] = matrix._data[i];
        }
        return this;
    };

    MATRIX33.prototype.clone = function() {
        /* Return new matrix with same data
         * 
         * @return: Matrix33 object
         */
        return new MATRIX33(this);
    };

    MATRIX33.prototype.fillSlow = function(value) {
        /* Fill matrix with some value
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
    MATRIX33.prototype.fillMedium = function(value) {
        /* Fill matrix with some value
        * 
        * @param value: used to fill matrix cell, if not defined default to 0
        * @return: this for chaining
        */
        if (value === undefined) {
            value = 0;
        }
        this._data = [value, value, value,
                      value, value, value,
                      value, value, value];
        return this;
    };
    MATRIX33.prototype.fill = function(value) {
        /* Fill matrix with some value
        * 
        * @param value: used to fill matrix cell, if not defined default to 0
        * @return: this for chaining
        */
        if (value === undefined) {
            value = 0;
        }
        this._data[m11] = this._data[m12] = this._data[m13] =
        this._data[m21] = this._data[m22] = this._data[m23] =
        this._data[m31] = this._data[m32] = this._data[m33] =
        value;
        return this;
    };

    MATRIX33.prototype.identitySlow = function() {
        /* Reset matrix to identity
        */
        this._data[m12] = this._data[m13] =
        this._data[m21] = this._data[m23] =
        this._data[m31] = this._data[m32] = 0;
        this._data[m11] = this._data[m22] = this._data[m33] = 1;
        return this;
    };
    MATRIX33.prototype.identityMedium = function() {
        this.fill(0);
        this._data[m11] = this._data[m22] = this._data[m33] = 1;
        return this;
    };
    MATRIX33.prototype.identity = function() {
        this._data = [1,0,0,
                      0,1,0,
                      0,0,1];
        return this;
    };
    MATRIX33.prototype.translate = function(vector) {
        /* Translate using vector2d 
        */
        this._data[m13] += vector.x;
        this._data[m23] += vector.y;
        return this;
    };

    MATRIX33.prototype.rotate = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        this._data[m11] = cos;
        this._data[m12] = sin;
        this._data[m21] = -sin;
        this._data[m22] = cos;
    };
    
    MATRIX33.prototype.determinant = function() { 
        return ((this._data[m11] * this._data[m13] * this._data[m33]) + 
               (this._data[m12] * this._data[m23] * this._data[m31]) +
               (this._data[m13] * this._data[m21] * this._data[m32])
               ) -
               ((this._data[m13] * this._data[m22] * this._data[m31]) - 
               (this._data[m12] * this._data[m21] * this._data[m33]) -
               (this._data[m11] * this._data[m23] * this._data[m32]));
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


    ns[_ns_] = MATRIX33;
    return ns[_ns_];
});
