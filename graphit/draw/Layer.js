define(function(require) {

    var util = require('graphit/util');    
    var MixinParameter = require('../mixin/parameter');
    var Context = require('../draw/Context');
    var MissingParameterException = require('graphit/exception/MissingParameter');
    
    var VALIDATORS = {
        'width' : {
            required : true
        },
        'height' : {
            required : true
        }
    };

    function LAYER(options) {
        this.__MODULE__ = 'graphit/draw/Layer';
        try {
            this.setParameters(options, VALIDATORS);
        } catch (e) {
            console.error(e);
            throw e;
        }
        this.options = options;

    };
    util.injectMixin(LAYER, MixinParameter);

    return LAYER;
});