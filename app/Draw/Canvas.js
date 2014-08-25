define(function(require) {

    var MissingParameterException = require('../Exception/MissingParameter');
    var InvalidDocumentIdException = require('../Exception/InvalidDocumentId');

    //    var List = require('../List/Dl/List');
    var Context = require('../Draw/Context');

    function MODULE(options) {
        this.__MODULE__ = 'Draw/Canvas';
        if (options === undefined) {
            throw new MissingParameterException('options');
        }
        if (options.width === undefined) { throw new MissingParameterException('options.width'); }
        if (options.height === undefined) { throw new MissingParameterException(
                'options.height'); }
        this.width = options.width;
        this.height = options.height;
        this.x = (options.x === undefined) ? 0 : x;
        this.y = (options.y === undefined) ? 0 : y;
        var id = (options.id === undefined)? undefined: options.id;
        this.front = this._newContext(id);
        this.back = null;
    }

    MODULE.prototype._newContext = function(id) {
        var elm = undefined;
        if (id !== undefined) {
            elm = document.getElementById(id);
            if (!elm) {
                throw new InvalidDocumentIdException(id);
            }
        } else {
            elm = document.createElement('canvas');
        }
        elm.width = this.width;
        elm.height = this.height;
        elm = new Context(elm);
        return elm;
    };

    MODULE.prototype.clearBackBuffer = function() {
        this.back = this._newContext();
    };

    MODULE.prototype.flip = function() {
        this.front.ctx.putImageData(
                this.back.ctx.getImageData(
                                           0, 0,
                this.width, this.height), 0, 0);
    };

    MODULE.prototype.getFront = function() {
        this.layers.first;
    };

    MODULE.prototype.getBack = function() {
        this.layers.last;
    };

    MODULE.prototype.toString = function() {
        return '<canvas width="' + this.width + '" height="' + this.height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    MODULE.prototype.getContext = function(back) {
        if (back) { return this.layers.last.content; }
        return this.layers.first.content;
    };

    MODULE.prototype.getElement = function(back) {
        if (back) { return this.layers.last.content.getElement(); }
        return this.layers.first.content.getElement();
    };

    return MODULE;
});