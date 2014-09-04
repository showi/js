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
        'root' : {
            required : true,
        },
        'ctx' : {
            required : true,
        },
        'compositing' : {
            required : false,
        }
    };

    function RENDERER() {
        this.setParameters(arguments, VALIDATOR);
        this.startTime = Date.now();
        this.endTime = null;
        this.frames = 0;
        this.fps = 0;
        this.ups = 0;
        this.delta = 0;
        this.fpsAvg = [];
        this.upsAvg = [];
        this.avgMax = 5;
        this.fixedDelta = 1000 / 120;
        this.fixedDraw = 1000 / 30;
        this.drawAdder = 0;
        console.log('FixedDelta', this.fixedDelta);
        this.deltaAdder = 0;
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
        this.ctx.save();
        if ('_compositing' in this) {
            for (key in this._compositing) {
                this.ctx[key] = this._compositing[key];
            }
        }
    };

    RENDERER.prototype._renderEnd = function() {

    };

    RENDERER.prototype.getFps = function(fps) {
        var fps = 0;
        for (var i = 0; i < this.fpsAvg.length; i++) {
            fps = (fps + this.fpsAvg[i]) / 2;
        }
        return fps;
    };

    RENDERER.prototype.addFps = function(fps) {
        if (this.fpsAvg.length > this.avgMax) {
            this.fpsAvg.shift();
        }
        this.fpsAvg.push(fps);
    };

    RENDERER.prototype.getUps = function(fps) {
        var fps = 0;
        for (var i = 0; i < this.upsAvg.length; i++) {
            fps = (fps + this.upsAvg[i]) / 2;
        }
        return fps;
    };

    RENDERER.prototype.addUps = function(fps) {
        if (this.upsAvg.length > this.avgMax) {
            this.upsAvg.shift();
        }
        this.upsAvg.push(fps);
    };

    RENDERER.prototype.step = function() {
        var delta = Date.now() - this.startTime;
        this.startTime = Date.now();
        var draw = false;
        var update = false;
        if ((delta + this.drawAdder) < this.fixedDraw) {
            this.drawAdder += delta;
        } else {
            draw = true;
            this.fps = (1 / (delta + this.drawAdder)) * 1000;
            this.addFps(this.fps);
            this.drawAdder -= this.fixedDraw;
        }
        if ((delta + this.deltaAdder) < this.fixedDelta) {
            this.deltaAdder += delta;
        } else {
            update = true;
            this.ups = (1 / (delta + this.deltaAdder)) * 1000;
            this.addUps(this.ups);
            this.deltaAdder -= this.fixedDelta;
        }
        if (!update) { return; }
        this.delta = this.fixedDelta;
        var that = this;
        this._renderInit();
        // if ('renderInit' in this) {
        // this.renderInit.call(this);
        // }
        // console.log('step', draw);
        this.root.preTraverse(function(node) {
            that.hookExec('pre_update', node);
            that.hookExec('update', node);
            that.hookExec('post_update', node);
            if (!draw) { return; }
            that.ctx.save();
            for ( var prop in eCtx) {
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
        // if ('renderEnd' in this) {
        // this.renderEnd.call(this);
        // }
        this._renderEnd();
        this.frames++;
    };
    return RENDERER;
});
