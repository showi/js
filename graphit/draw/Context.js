define(function(require) {

    var InvalidDocumentIdException = require('graphit/exception/InvalidDocumentId');

    function CONTEXT(canvas) {
        this.__MODULE__ = 'graphit/draw/Context';
        if (!(this instanceof CONTEXT)) { return new CONTEXT(canvas); }
        if (!CONTEXT.prototype.arc) {
            CONTEXT.setup.call(this, this.ctx);
        }
        this.setCanvas(canvas);
    }

    CONTEXT.prototype.setCanvas = function(canvas) {
        this.ctx = canvas.getContext('2d');
    };

    CONTEXT.prototype.getCtx = function() {
        return this.ctx;
    };
    
    CONTEXT.prototype.copyData = function(src, sX, sY, width, height) {
        this.ctx.putImageData(src.ctx.getImageData(sX, sY, width, height), 0, 0);
    };

    CONTEXT.setup = function() {
        var methods = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo',
                'clearRect', 'clip', 'closePath', 'drawImage', 'fill',
                'fillRect', 'fillText', 'lineTo', 'moveTo',
                'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save',
                'scale', 'setTransform', 'stroke', 'strokeRect', 'strokeText',
                'transform', 'translate'];

        var getterMethods = ['createPattern', 'drawFocusRing',
                'isPointInPath', 'measureText', // drawFocusRing not currently
                // supported
                // The following might instead be wrapped to be able to chain
                // their child objects
                'createImageData', 'createLinearGradient',
                'createRadialGradient', 'getImageData', 'putImageData'];

        var props = ['canvas', 'fillStyle', 'font', 'globalAlpha',
                'globalCompositeOperation', 'lineCap', 'lineJoin',
                'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
                'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign',
                'textBaseline'];

        var gmethl, propl;
        for (var i = 0, methl = methods.length; i < methl; i++) {
            var m = methods[i];
            CONTEXT.prototype[m] = (function(m) {
                return function() {
                    this.ctx[m].apply(this.ctx, arguments);
                    return this;
                };
            }(m));
        }
        for (i = 0, gmethl = getterMethods.length; i < gmethl; i++) {
            var gm = getterMethods[i];
            CONTEXT.prototype[gm] = (function(gm) {
                return function() {
                    return this.ctx[gm].apply(this.ctx, arguments);
                };
            }(gm));
        }
        for (i = 0, propl = props.length; i < propl; i++) {
            var p = props[i];
            CONTEXT.prototype[p] = (function(p) {
                return function(value) {
                    if (typeof value === 'undefined') { return this.ctx[p]; }
                    this.ctx[p] = value;
                    return this;
                };
            }(p));
        }
    };
    return CONTEXT;
});