define(function(require) {

    var InvalidDocumentIdException = require('../exception/InvalidDocumentId');
    var Context = require('../draw/Context');
    var util = require('graphit/util');
    var MixinParameter = require('../mixin/parameter');

    var VALIDATORS = {
        width : {
            required : true,
            defaultValue : 100
        },
        height : {
            required : true,
            defaultValue : 100
        },
        id : {
            required: false,
        }
    };

    function CANVAS(options) {
        this.__MODULE__ = 'graphit/draw/Canvas';
        this.checkParameters(options, VALIDATORS);
        this.element = null;
        this.context = null;
        this._newContext(options.width, options.height, options.id);
    }
    ;

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
        this.context.copyData(src.context, 0, 0, this.width(), this.height());
    };

    CANVAS.prototype.getCtx = function() {
        return this.context.ctx;
    };

    CANVAS.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    CANVAS.prototype.getContext = function() {
        return this.context;
    };

    CANVAS.prototype.getElement = function() {
        return this.element;
    };

    CANVAS.prototype.width = function(value) {
        if (value !== undefined) {
            this.element.width = value;
            return this;
        }
        return this.element.width;
    };

    CANVAS.prototype.height = function(value) {
        if (value !== undefined) {
            this.element.height = value;
            return this;
        }
        return this.element.height;
    };
    util.injectMixin(CANVAS, MixinParameter);
    return CANVAS;
});