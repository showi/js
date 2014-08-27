define(function(require) {

    var MissingParameterException = require('graphit/exception/MissingParameter');
    var MixinParameter = require('graphit/mixin/parameter');
    
    var Context = require('../Context');
    var DoubleBuffer = require('../DoubleBuffer');
    var Canvas = require('../Canvas');
    var tool = require('../tool');
    var shape = require('../shape');
    var util = require('../../util');
    var Position = require('graphit/physic/Position');

    var VALIDATORS = {
            width: {required: true},
            height: {required: true},
            value: {required: true},
            position: {required: true, defaultValue: Position()},
    };

    function SEVENSEGMENTDISPLAY(options) {
        this.__MODULE__ = 'graphit/draw/widget/SevenSegmentDisplay';
        this.setParameters(options, VALIDATORS);
    }
    
    function draw(ctx) {
        
    }

    util.injectMixin(SEVENSEGMENTDISPLAY, MixinParameter);
    return SEVENSEGMENTDISPLAY;
});