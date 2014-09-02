define(function(require) {

    var util = require('graphit/util');
    var ParameterMixin = require('graphit/mixin/parameter');    

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
    
    RENDERER.prototype.render = function() {
//        console.log('Start rendering');
        var that = this;
        if ('pre_render' in this) {
            this.pre_render(this);
        }
        this.root.preTraverse(function(node) {
            if('render' in node) {
                that.ctx.save();
                node.render(that);
                that.ctx.restore();
            }
        });
        if ('post_render' in this) {
            this.post_render(this);
        }
    };
    util.injectMixin(RENDERER, ParameterMixin);
    return RENDERER;
});
    