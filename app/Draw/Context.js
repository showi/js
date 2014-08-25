define(function(require) {

    function MODULE(canvas) {
        this.__MODULE__ = 'Draw/Context';
        if (canvas === undefined) {
            canvas = document.createElement('canvas');
        } else if (typeof canvas === 'string') {
            canvas = document.getElementById(canvas);
        }
        console.info('Context constructor: ', canvas);
        if (!(this instanceof MODULE)) { return new MODULE(canvas); }
        this.ctx = canvas.getContext('2d');
        this.element = canvas;
        if (!MODULE.prototype.arc) {
            MODULE.setup.call(this, this.ctx);
        }
    }

    MODULE.prototype.setContext = function(canvas)
    {
        this.element = canvas;
        this.ctx = canvas.getContext('2d');
        return this;
    };
    MODULE.prototype.getElement = function()
    {
        return this.element;
    };
    MODULE.setup = function() {
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
            MODULE.prototype[m] = (function(m) {
                return function() {
                    this.ctx[m].apply(this.ctx, arguments);
                    return this;
                };
            }(m));
        }

        for (i = 0, gmethl = getterMethods.length; i < gmethl; i++) {
            var gm = getterMethods[i];
            MODULE.prototype[gm] = (function(gm) {
                return function() {
                    return this.ctx[gm].apply(this.ctx, arguments);
                };
            }(gm));
        }

        for (i = 0, propl = props.length; i < propl; i++) {
            var p = props[i];
            MODULE.prototype[p] = (function(p) {
                return function(value) {
                    if (typeof value === 'undefined') { return this.ctx[p]; }
                    this.ctx[p] = value;
                    return this;
                };
            }(p));
        }
    };
    return MODULE;
});