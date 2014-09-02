define(function(require) {

    var MissingParameterException = require('../exception/MissingParameter');
    var InvalidDocumentIdException = require('../exception/InvalidDocumentId');

    var Canvas = require('../draw/canvas');

    function CANVAS(options) {
        this.__MODULE__ = 'graphit/draw/doublebuffer';
        this.front = new Canvas(options);
        this.back = new Canvas(options);
//        this.back = null;
    }

    CANVAS.prototype.clearBackBuffer = function(color) {
        this.back.clear(color);
//        this.back = new Canvas({
//            width : this.width(),
//            height : this.height()
//        });
    };

    CANVAS.prototype.flip = function() {
        this.front.copyData(this.back);
    };

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
