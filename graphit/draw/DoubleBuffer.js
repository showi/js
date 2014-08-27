define(function(require) {

    var MissingParameterException = require('../exception/MissingParameter');
    var InvalidDocumentIdException = require('../exception/InvalidDocumentId');

    var Canvas = require('../draw/Canvas');

    function CANVAS(options) {
        this.__MODULE__ = 'graphit/draw/DoubleBuffer';
        this.front = new Canvas(options);
        this.back = null;
    }

    CANVAS.prototype.clearBackBuffer = function() {
        this.back = new Canvas({
            width  : this.width(),
            height : this.height()
        });
    };

    CANVAS.prototype.flip = function() {
        this.front.copyData(this.back);
    };

//    CANVAS.prototype.copyData = function(target, src) {
//        return target.copyData(src);
//    };

    CANVAS.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    CANVAS.prototype.width = function(value) {
        if (value !== undefined) {
            this.front.width(value);
            this.back.width(value);
            return this;
        }
        return this.front.width();
    };

    CANVAS.prototype.height = function(value) {
        if (value !== undefined) {
            this.front.height(value);
            this.back.height(value);
            return this;
        }
        return this.front.height();
    };

    return CANVAS;
});