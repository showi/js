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
    
    RENDERER.prototype.hookExec = function(name, node) {
        if (name in this) {
            this[name].call(this, node);
        }
        if (name in node) {
            node[name].call(node, this);
        }
    };

    RENDERER.prototype.step = function() {
        var that = this;
        if ('renderInit' in this) {
            this.renderInit(this);
        }
        this.root.preTraverse(function(node) {
                that.hookExec('pre_update', node);
                that.hookExec('update', node);
                that.hookExec('post_update', node);
                that.hookExec('pre_render', node);
                that.hookExec('render', node);
                that.hookExec('post_render', node);
        });
        if ('renderEnd' in this) {
            this.post_render(this);
        }
    };

    util.injectMixin(RENDERER, ParameterMixin);
    return RENDERER;
});
    