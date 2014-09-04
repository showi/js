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
        // this.frames = 0;
        this.fps = 0;
        this.ups = 0;
        this.delta = 0;
        this.fpsAvg = [];
        this.upsAvg = [];
        this.avgMax = 5;
        this.lsdraw = [];
        this.skipped = 0;
        this.numUpdate = 0;
        this.fixedUpdate = Math.round(1000 / 66);
        this.fixedDraw = Math.round(1000 / 33);
        this.updateAdder = 0;
        this.drawAdder = 0;
    }
    ParameterMixin.call(RENDERER.prototype);

    RENDERER.prototype.log_stats = function() {
        var keys = ['getFps', 'getUps', 'fixedUpdate', 'fixedDraw',
                    'drawAdder', 'updateAdder', 'skipped', 'numUpdate',
                    'avgMax'];
        for (var i = 0; i < keys.length; i++) {
            if (typeof this[keys[i]] == 'function') {
                console.log(keys[i], this[keys[i]].call(this));
            } else {
                console.log(keys[i], this[keys[i]]);
            }
        }
    };

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
        var delta = (Date.now() - this.startTime);
        this.startTime = Date.now();
        var draw = false;
        var update = false;
        this.drawAdder += delta;
        this.updateAdder += delta;
        var diff = 0;
        if (this.updateAdder >= this.fixedUpdate) {
            this.numUpdate = Math.round(this.updateAdder / this.fixedUpdate);
            if (this.numUpdate > 0) {
                update = true;
            }
            this.ups = (this.numUpdate / this.updateAdder) * 1000;
            this.addUps(this.ups);
            this.updateAdder -= this.fixedUpdate * this.numUpdate;
        } else if (this.updateAdder < 0) {
            this.updateAdder = 0;
        }
        if (this.drawAdder >= this.fixedDraw) {
            draw = true;
            this.fps = (1 / this.drawAdder) * 1000;
            this.addFps(this.fps);
            this.drawAdder -= this.fixedUpdate * this.numUpdate;
        } else if(this.drawAdder < 0) {
            this.drawAdder = 0;
        }
        this.delta = this.fixedUpdate;
        this.skipped = 0;
        var that = this;

        if (!update) {
            this.skipped++;
        }
        if (update) {
            for (var i = 0; i < this.numUpdate; i++) {
                this.lsdraw = [];
                this.root.preTraverse(function(node) {
                    if (update) {
                        that.hookExec('pre_update', node);
                        that.hookExec('update', node);
                        that.hookExec('post_update', node);
                        if (draw) {
                            if (tree.hasCapability(node, eCap.draw)) {
                                that.lsdraw.push(node);
                            }
                        }
                    }

                });
            }
        }
        // }
        if (draw) {
            this.drawAdder -= delta;
            for (var i = 0; i < this.lsdraw.length; i++) {
                var node = this.lsdraw[i];
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
        }
    };

    return RENDERER;
});
