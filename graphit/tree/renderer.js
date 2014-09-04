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
    var tree = require('graphit/tree/util');
    var eCap = require('graphit/enum/capability');
    var eMat = require('graphit/enum/matrix33');
    var eCtx = require('graphit/enum/context');

    var VALIDATOR = {
            'root': {
                required: true,
            },
            'ctx': {
                required: true,
            },
            'compositing': {
                required: false,
            }
    };
    


    function RENDERER() {
        this.setParameters(arguments, VALIDATOR);
        console.log('root', this.root);
        this.startTime = Date.now();
        this.endTime = null;
        this.frames = 0;
        this.fps = 0;
    }
    ParameterMixin.call(RENDERER.prototype);
    
    RENDERER.prototype.hookExec = function(name, node) {
        if (name in this) {
            this[name].call(this, node);
        }
        if (name in node) {
            node[name].call(node, this);
        }
    };

    RENDERER.prototype._renderInit = function() {
        this.startTime = Date.now();
        this.ctx.save();
        if ('_compositing' in this) {
            for (key in this._compositing) {
                this.ctx[key] = this._compositing[key];
            }
        }
    };

    RENDERER.prototype._renderEnd = function() {
        this.ctx.restore();
        this.endTime = Date.now();
        this.delta = this.endTime - this.startTime;
        this.frames++;
        this.fps = (this.fps + Math.round((1/this.delta) * 1000)) / 2;
        if(this.fps > 0 && this.fps < 1) {
            this.fps = 1;
        }
    };

    RENDERER.prototype.step = function() {
        this.endTime = Date.now();
        this.delta = this.endTime - this.startTime;
        var that = this;
        this.fps = 0;
        this.startTime = Date.now();
        this._renderInit();
        if ('renderInit' in this) {
            this.renderInit.call(this);
        }
        this.root.preTraverse(function(node) {
                that.hookExec('pre_update', node);
                that.hookExec('update', node);
                that.hookExec('post_update', node);
                that.ctx.save();
                for (var prop in eCtx) {
                    if (prop in node) {
                        that.ctx[prop] = node[prop];
                    }
                }
                if (tree.hasCapability(node, eCap.transform)) {
                    that.ctx.translate(node.transform._data[eMat.mX],
                                       node.transform._data[eMat.mY]);
                }
                that.hookExec('pre_render', node);
                that.hookExec('render', node);
                that.hookExec('post_render', node);
                that.ctx.restore();
        });
        if ('renderEnd' in this) {
            this.renderEnd.call(this);
        }
        this._renderEnd();
    };
    return RENDERER;
});
    