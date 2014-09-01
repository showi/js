define(function(require) {
 
    var global = require('graphit/global');
 
    function injectProperties(obj, properties) {
        for (var i = 0; i < properties.length; i++) {
            var meth = properties[i];
            var key = '_' + meth;
            console.log('getter/setter for ' + key);
            obj.prototype[meth] = function(value) {
                if (value === undefined) {
                    return obj[key];
                }
                obj[key] = value;
                return this;
            };
        }
    }

    function NODE(parent) {
        this.__namespace__ = 'graphit/tree/node';
        this.uid = global.genuid();
        this.childs = [];
        if (!(this instanceof NODE)) { return new NODE(parent); }
        if (!NODE.prototype.parent) {
            injectProperties(NODE, ['parent', 'traversable']);
        }
        this.parent(parent);
        this.traversable(true);
    };
    
    NODE.prototype.appendChild = function(child) {
        child.parent = this;
        this.childs.push(child);
    };
    
    NODE.prototype.preTraverse = function(fn) {
        fn(this);
        if (!this.traversable()) {
            this.log('Not traversable');
            return;
        }
        for (var i = 0; i < this.childs.length; i++) {
//            var child = this.childs[i];
//            console.log('Child', this.childs[i]);
            this.childs[i].preTraverse(fn);
        }
    };

    NODE.prototype.postTraverse = function(fn) {
        for (var i = 0; i < this.childs.length; i++) {
            var child = this.childs[i];
            child.postTraverse(fn);
        }
        fn(this);
    };
    NODE.prototype.log = function(msg) {
        console.log(this.__namespace__, this.uid, msg);
    };
//    NODE.prototype.set_parent = function(parent) {
//        this.parent = parent;
//    };
//
//    NODE.prototype.get_parent = function() {
//        return this.parent;
//    };
//    CONTEXT.setup = function() {
//        var methods = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo',
//                'clearRect', 'clip', 'closePath', 'drawImage', 'fill',
//                'fillRect', 'fillText', 'lineTo', 'moveTo',
//                'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save',
//                'scale', 'setTransform', 'stroke', 'strokeRect', 'strokeText',
//                'transform', 'translate'];
//
//        var getterMethods = ['createPattern', 'drawFocusRing',
//                'isPointInPath', 'measureText', // drawFocusRing not currently
//                // supported
//                // The following might instead be wrapped to be able to chain
//                // their child objects
//                'createImageData', 'createLinearGradient',
//                'createRadialGradient', 'getImageData', 'putImageData'];
//
//        var props = ['canvas', 'fillStyle', 'font', 'globalAlpha',
//                'globalCompositeOperation', 'lineCap', 'lineJoin',
//                'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
//                'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign',
//                'textBaseline'];
//
//        var gmethl, propl;
//        for (var i = 0, methl = methods.length; i < methl; i++) {
//            var m = methods[i];
//            CONTEXT.prototype[m] = (function(m) {
//                return function() {
//                    this.ctx[m].apply(this.ctx, arguments);
//                    return this;
//                };
//            }(m));
//        }
//        for (i = 0, gmethl = getterMethods.length; i < gmethl; i++) {
//            var gm = getterMethods[i];
//            CONTEXT.prototype[gm] = (function(gm) {
//                return function() {
//                    return this.ctx[gm].apply(this.ctx, arguments);
//                };
//            }(gm));
//        }
//        for (i = 0, propl = props.length; i < propl; i++) {
//            var p = props[i];
//            CONTEXT.prototype[p] = (function(p) {
//                return function(value) {
//                    if (typeof value === 'undefined') { return this.ctx[p]; }
//                    this.ctx[p] = value;
//                    return this;
//                };
//            }(p));
//        }
//    };

    return NODE;
});