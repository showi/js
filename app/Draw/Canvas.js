define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var InvalidDocumentIdException = require('../Exception/InvalidDocumentId');

    //    var List = require('../List/Dl/List');
    var Context = require('../Draw/Context');

    function CANVAS(options) {
        this.__MODULE__ = 'Draw/Canvas';
        if (options === undefined) {
            throw new MissingParameterException('options');
        }
        if (options.width === undefined) { throw new MissingParameterException('options.width'); }
        if (options.height === undefined) { throw new MissingParameterException(
                'options.height'); }
        this._width = options.width;
        this._height = options.height;
        this.x = (options.x === undefined) ? 0 : x;
        this.y = (options.y === undefined) ? 0 : y;
        var id = (options.id === undefined)? undefined: options.id;
        this.front = this._newContext(id);
        this.back = null;
    }

    CANVAS.prototype._newContext = function(id) {
        var elm = undefined;
        if (id !== undefined) {
            elm = document.getElementById(id);
            if (!elm) {
                throw new InvalidDocumentIdException(id);
            }
        } else {
            elm = document.createElement('canvas');
        }
        elm.width = this._width;
        elm.height = this._height;
        elm = new Context(elm);
        return elm;
    };

    CANVAS.prototype.clearBackBuffer = function() {
        this.back = this._newContext();
    };

    CANVAS.prototype.flip = function() {
        this.front.ctx.putImageData(
                this.back.ctx.getImageData(
                                           0, 0,
                this._width, this._height), 0, 0);
    };
    CANVAS.prototype.copyData = function(src) {
        this.back.ctx.putImageData(
                src.ctx.getImageData(
                                           0, 0,
                this._width, this._height), 0, 0);
    };
    CANVAS.prototype.getFront = function() {
        this.layers.first;
    };

    CANVAS.prototype.getBack = function() {
        this.layers.last;
    };

    CANVAS.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    CANVAS.prototype.getContext = function(back) {
        if (back) { return this.layers.last.content; }
        return this.layers.first.content;
    };

    CANVAS.prototype.getElement = function(back) {
        if (back) { return this.layers.last.content.getElement(); }
        return this.layers.first.content.getElement();
    };

    CANVAS.prototype.width = function(value) {
        if (value !== undefined) {
            this._width = value;
            this.front.width(value);
            return this;
        }
        return this._width;
    };
    CANVAS.prototype.height = function(value) {
        if (value !== undefined) {
            this._height = value;
            this.front.height(value);
            return this;
        }
        return this._height;
    };
    return CANVAS;
});