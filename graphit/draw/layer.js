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

    var util = require('graphit/util');    
    var MixinParameter = require('../mixin/argument');
    var Context = require('../draw/context');
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
        this.__namespace__ = 'graphit/draw/layer';
        try {
            this.setArguments(options, VALIDATORS);
        } catch (e) {
            console.error(e);
            throw e;
        }
        this.options = options;

    };
    util.injectMixin(LAYER, MixinParameter);

    return LAYER;
});