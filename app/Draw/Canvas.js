define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var InvalidDocumentIdException = require('../Exception/InvalidDocumentId');

    var Context = require('../Draw/Context');

    function CANVAS(options) {
        this.__MODULE__ = 'Draw/Canvas';
        this._newContext(options.width, options.height, options.id);
    }

    CANVAS.prototype._newContext = function(width, height, id) {
        var elm = undefined;
        if (id !== undefined) {
            elm = document.getElementById(id);
            if (!elm) { throw new InvalidDocumentIdException(id); }
        } else {
            elm = document.createElement('canvas');
        }
        elm.width = width;
        elm.height = height;
        this.element = elm;
        this.context = new Context(elm);
    };

    CANVAS.prototype.copyData = function(src) {
        this.context.copyData(src.context);
    };

    CANVAS.prototype.getCtx = function() {
        return this.context.ctx;
    };

    CANVAS.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    CANVAS.prototype.getContext = function(back) {
        return this.context;
    };

    CANVAS.prototype.getElement = function(back) {
        return this.element;
    };

    CANVAS.prototype.width = function(value) {
        if (value !== undefined) {
            this.context.width(value);
            this.element.width(value);
            return this;
        }
        return this.context.width();
    };
    CANVAS.prototype.height = function(value) {
        if (value !== undefined) {
            this.context.height(value);
            this.element.height(value);
            return this;
        }
        return this.context.height();
    };
    return CANVAS;
});