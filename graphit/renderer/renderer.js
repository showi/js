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
    var Node = require('graphit/tree/node/node');
    var Matrix33 = require('graphit/math/matrix33');
    var Dlist = require('graphit/datatype/dlist');
    var math = require('graphit/math');
    var Layer = require('graphit/renderer/layer');

    var VALIDATOR = {
        'root' : {
            required : true,
            defaultValue : new Node(),
        },
        'ctx' : {
            required : true,
        },
        'compositing' : {
            required : false,
        },
        'worldTransform' : {
            required : true,
            defaultValue : new Matrix33(),
        }
    };

    function RENDERER() {
        this.now = Date.now();
        this.uid = util.genUID();
        this.setParameters(arguments, VALIDATOR);
        this.startTime = Date.now();
        this.endTime = null;
        this.delta = 0;
        this.skipped = 0;
        this.skippedDraw = 0;
        this.numUpdate = 0;
        this.fixedUpdate = 10;
        this.fixedDraw = 20;
        this.timeout = 3;
        this.delta = this.fixedUpdate;
        this.updateAdder = 0;
        this.drawAdder = 0;
        this.limitUpdate = 4;
        this.limitDrawSkipped = 2;
        this.limitRenderSkipped = 2;
        this.limitFps = 20;
        this.nodeRendered = 0;
        this.maxUps = 120;
        this.transforms = new Dlist();
        this.transform = undefined;
        this.node = new Dlist();
        this.layer = new Layer();
        this.measure = {
            fps : {
                value : 0,
                count : 0
            },
            ups : {
                value : 0,
                count : 0
            },
            time : {
                delta : null,
                stopOn : null,
                start : Date.now(),
                end : null
            },
        };
    }
    RENDERER.__namespace__ = 'graphit/renderer/renderer';
    ParameterMixin.call(RENDERER.prototype);

    RENDERER.prototype.pushTransform = function(transform) {
        this.transforms.append(transform);
        this.transform = transform;
        return this;
    };

    RENDERER.prototype.popTransform = function() {
        var elm = this.transforms.pop();
        this.transform = elm.content;
        return this;
    };

    RENDERER.prototype.measureStart = function() {
        this.measure.fps.count = 0;
        this.measure.ups.count = 0;
        var now = Date.now();
        this.measure.time.start = now;
        this.measure.time.stopOn = now + 1000;
        return this;
    };

    RENDERER.prototype.measureEnd = function() {
        var end = Date.now();
        if (end <= this.measure.time.stopOn) { return false; }
        this.measure.time.end = end;
        var delta = (end - this.measure.time.start);
        var fps = this.measure.fps.count / delta;
        var ups = this.measure.ups.count / delta;
        this.measure.fps.value = fps;
        this.measure.ups.value = ups;
        this.measure.time.delta = delta;
        return true;
    };

    RENDERER.prototype.log_stats = function() {
        var keys = ['ups', 'fps', 'fixedUpdate', 'fixedDraw', 'drawAdder',
                    'updateAdder', 'skipped', 'numUpdate', 'avgMax'];
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
        if (node !== undefined && name in node) {
            node[name].call(node, this);
        }
    };

    RENDERER.prototype.ups = function() {
        return this.measure.ups.value;
    };

    RENDERER.prototype.fps = function() {
        return this.measure.fps.value;
    };

    RENDERER.prototype.apply_node_context = function(node) {
        var key = null, i;
        for (i = 0; i < eCtx._keys.length, key = eCtx._keys[i]; i++) {
            // key = eCtx._keys[i];
            if (node[key] !== undefined && node[key] != this.ctx[key]) {
                this.ctx[key] = node[key];
            }
        }
    };

    RENDERER.prototype.step = function() {
        this.now = Date.now();
        var delta = (this.now - this.startTime);
        this.startTime = Date.now();
        var doDraw = false;
        var doUpdate = false;
        var nodes = undefined;
        var child = null;
        var node = null;

        this.elapsedTime = 0;
        this.drawAdder += delta;
        this.updateAdder += delta;
        if (this.updateAdder >= this.fixedUpdate) {
            var numUpdate = 0;
            doUpdate = true;
            numUpdate = Math.floor(this.updateAdder / this.fixedUpdate);
            numUpdate = math.clamp(numUpdate, 1, this.limitUpdate);
            this.numUpdate = numUpdate;
            this.elapsedTime = numUpdate * this.fixedUpdate;
            this.updateAdder -= this.elapsedTime;
        }
        if (this.drawAdder >= this.fixedDraw) {
            doDraw = true;
            this.drawAdder -= (this.fixedDraw * this.numUpdate);
        }
        var that = this;
        if (this.fps() < this.limitFps && this.ups() > 60
                && this.skipped < this.limitRenderSkipped) {
            doUpdate = false;
        }
        if (doUpdate == false) {
            this.skipped++;
        } else {
            this.skipped = 0;
            for (var i = 0; i < this.numUpdate; i++) {
                this.node.empty();
                this.layer.empty();
                this.measure.ups.count++;
                this.transforms.empty();
                this.updateAdder -= (this.fixedUpdate);
                this.pushTransform(this.worldTransform);
                // this.worldTransform.copy(this.worldTransform);
                if (this.render_node(this.root)) {
                    this.layer.append(this.root);
                }

            }
        }
        if (this.fps() < this.limitFps
                && this.skippedDraw < this.limitDrawSkipped) {
            doDraw = false;
        }
        if (doDraw == false) {
            this.skippedDraw++;
        } else {
            this.skippedDraw = 0;
            this.measure.fps.count++;
            that.ctx.save();
            that.apply_node_context(this.compositing);
            that.hookExec('draw_init');
            this.nodeRendered = this.layer.length;
            child = this.node.first;
            var layer, node = null;
            for (var lidx = this.layer.data.length - 1; lidx >= 0; lidx--) {
                layer = this.layer.data[lidx];
                if (layer == undefined) {
                    continue;
                }
                for (var nidx = 0; nidx < layer.length; nidx++) {
                    node = layer[nidx];
                    that.ctx.save();
                    if (tree.hasCapability(node, eCap.transform)) {
                        this.ctx.translate(node.worldTransform.positionX(),
                                           node.worldTransform.positionY());
                    }
                    that.hookExec('pre_render', node);
                    if (tree.hasCapability(node, eCap.render)) {
                        that.apply_node_context(node);
                    }
                    that.hookExec('render', node);
                    if (this.ctx.fillStyle) {
                        this.ctx.fill();
                    }
                    if (this.ctx.strokeStyle) {
                        this.ctx.stroke();
                    }
                    that.hookExec('post_render', node);
                    that.ctx.restore();
                    // child = child.next;
                }
            }
            that.hookExec('draw_end');
            that.ctx.restore();
        }
    };

    RENDERER.prototype.render_node = function(node) {
        var child = null;

        // if (tree.hasCapability(node, eCap.prune)) {
        // if (node.parent === undefined || !node.parent) {
        // console.error('Cannot prune root node');
        // return false;
        // } else {
        // node.parent.child.remove(node);
        // }
        // return false;
        // }
        this.hookExec('pre_update', node);
        if (tree.hasCapability(node, eCap.transform)) {
            this.pushTransform(node.applyWorldTransform(this.transform));
        }
        this.hookExec('update', node);
        this.hookExec('post_update', node);
        child = node.child.first;
        while (child != null) {
            if (this.render_node(child.content)) {
                this.layer.append(child.content);
            }
            child = child.next;
        }
        if (tree.hasCapability(node, eCap.transform)) {
            this.popTransform();
        }
        if (!tree.hasCapability(node, eCap.draw)) { return false; }
        return true;
    };

    return RENDERER;
});
