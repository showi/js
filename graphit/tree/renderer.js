define(function(require) {

    var util = require('graphit/util');
    var ParameterMixin = require('graphit/mixin/parameter');    
    var tutil = require('graphit/tree/util');
    var eCap = require('graphit/tree/enum/capability');
    var eMat = require('graphit/math/enum/matrix');

    var VALIDATOR = {
            'root': {
                required: true,
            },
            'ctx': {
                required: true,
            }
    };
    function RENDERER() {
        this.setParameters(arguments[0], VALIDATOR);
        console.log('root', this.root);
    }
    
    RENDERER.prototype.update = function() {
        var that = this;
        this.root.preTraverse(function(node) {
            if (tutil.hasCapability(node, eCap.transform)) {
                node.updateTransform(that);
            }
        });
    };

    RENDERER.prototype.render = function() {
        var that = this;
        that.ctx.save();
        if ('pre_render' in this) {
            this.pre_render(this);
        }
        this.root.preTraverse(function(node) {
            if('update' in node) {
                node.update();
            }
            if (tutil.hasCapability(node, eCap.transform)) {
                if(node._parent) {
                    //console.log('WorldTransform')
                    node.worldTransform = 
                        node.transform.mul(node.parent.worldTransform);
                }
                that.ctx.rotate(node.transform.angle());
                that.ctx.translate(node.transform._data[eMat.m13], 
                                   node.transform._data[eMat.m23]);
            }
            if('render' in node) {
                node.render(that);
            }
        });
        if ('post_render' in this) {
            this.post_render(this);
        }
        that.ctx.restore();
    };
    util.injectMixin(RENDERER, ParameterMixin);
    return RENDERER;
});
    