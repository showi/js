/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
 */
define(function(require) {

    'use strict';

    var MissingParameterException = require('graphit/exception/MissingParameter');
    var MixinParameter = require('graphit/mixin/parameter');

    var Context = require('../context');
    var DoubleBuffer = require('../doublebuffer');
    var Canvas = require('../canvas');
    var tool = require('../tool');
    var shape = require('../shape');
    var util = require('../../util');
    var Position = require('graphit/physic/Position');

    var VALIDATORS = {
        width : {
            required : true
        },
        height : {
            required : true
        },
        value : {
            required : true
        },
        position : {
            required : true,
            defaultValue : Position()
        },
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
