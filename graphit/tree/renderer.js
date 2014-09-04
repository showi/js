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
        this.fixedDelta = Math.round(1000 / 66);
        this.fixedDraw = Math.round(1000 / 33);
        console.log(this.fixedDelta, this.fixedDraw);
        this.drawAdder = 0;
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
        var ups = 0;
        for (var i = 0; i < this.upsAvg.length; i++) {
            ups = (ups + this.upsAvg[i]) / 2;
        }
        return ups;
    };

    RENDERER.prototype.addUps = function(ups) {
        if (this.upsAvg.length > this.avgMax) {
            this.upsAvg.shift();
        }
        this.upsAvg.push(ups);
    };

    RENDERER.prototype.apply_node_context = function(node) {
        for (var i = 0; i < eCtx.keys.length; i++) {
            var prop = eCtx[eCtx.keys[i]];
            if (node[prop] != undefined) {
                this.ctx[prop] = node[prop];
            }
        }
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
        }
        if (!update && !draw) { return; }
        this.delta = this.fixedDelta;
        var that = this;
        var lsdraw = [];
        this.root.preTraverse(function(node) {
            if (update) {
                that.hookExec('pre_update', node);
                that.hookExec('update', node);
                that.hookExec('post_update', node);
            }
            if (draw) {
                if (tree.hasCapability(node, eCap.draw)) {
                    lsdraw.push(node);
                }
            }
        });
        if (draw) {
            for (var i = 0; i < lsdraw.length; i++) {
                var node = lsdraw[i];
                that.ctx.save();
                that.apply_node_context(node);
                
                if (tree.hasCapability(node, eCap.transform)) {
                    that.ctx.translate(node.transform._data[eMat.mX],
                                       node.transform._data[eMat.mY]);
                }
                that.hookExec('pre_render', node);
                that.hookExec('render', node);
                that.hookExec('post_render', node);
                that.ctx.restore();
            }
            this.frames++;
        }
    };
    return RENDERER;
});
