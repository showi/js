define(function(require) {

    var util = require('graphit/util');    
    var MixinParameter = require('../mixin/parameter');
    
    var VALIDATORS = {
            x: {required: true, defaultValue: 0},
            y: {required: true, defaultValue: 0},
    };

    function POSITION(options) {
        this.__MODULE__ = 'graphit/physic/Position';
        this.setParameters(options, VALIDATORS);
    };
    util.injectMixin(POSITION, MixinParameter);
});