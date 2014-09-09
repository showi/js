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
    var RenderableMixin = require('graphit/mixin/renderable');
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
//        this.delta = 0;
        this.skipped = 0;
        this.skippedDraw = 0;
        this.numUpdate = 0;
        this.fixedUpdate = 10;
        this.fixedDraw = 20;
        this.timeout = 3;
        //this.delta = this.fixedUpdate;
        this.updateAdder = 0;
        //this.drawAdder = 0;
        this.limitUpdate = 4;
        this.limitDrawSkipped = 2;
        this.limitRenderSkipped = 2;
        this.limitFps = 20;
        this.nodeRendered = 0;
        this.maxUps = 120;
        this.transforms = new Dlist();
        this.transform = undefined;
//        this.node = new Dlist();
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
        this.canDraw = false;
        this.setCtx(this.ctx);
    }
    RENDERER.__namespace__ = 'graphit/renderer/renderer';
    ParameterMixin.call(RENDERER.prototype);
    RenderableMixin.call(RENDERER.prototype);

    RENDERER.prototype.setCtx = function(ctx) {
        ctx.fillStyle = null;
        ctx.strokeStyle = null;
        this.ctx = ctx;
        this.apply_node_context(this.compositing);
    }
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
        var that = this;
        this.now = Date.now();
        var delta = (this.now - this.startTime);
        this.startTime = this.now;
        var doDraw = false;
        var doUpdate = false;
        var  wt = null;

        this.elapsedTime = 0;
        this.updateAdder += delta;
        if (this.updateAdder >= this.fixedUpdate) {
            var numUpdate = 0;
            doUpdate = true;
            numUpdate = Math.floor(this.updateAdder / this.fixedUpdate);
            numUpdate = math.clamp(numUpdate, 1, this.limitUpdate);
            this.numUpdate = numUpdate;
            this.elapsedTime = numUpdate * this.fixedUpdate;
            this.updateAdder -= this.elapsedTime;
            var lh = this.fixedUpdate * this.limitUpdate;
            if (this.updateAdder > lh) {
                this.elapsedTime += lh;
                this.updateAdder -= lh;
                this.canDraw = false;
            }
        }
        if (doUpdate == false) {
            this.skipped++;
        } else {
            this.skipped = 0;
            this.layer.empty();
            this.measure.ups.count++;
            this.transforms.empty();
            this.pushTransform(this.worldTransform);
            if (this.render_node(this.root, this.elapsedTime)) {
                this.layer.append(this.root);
            }
        }
        if (this.canDraw) {
            this.canDraw = false;
            doDraw = true;
        }
        if (doDraw == false) {
            this.skippedDraw++;
        } else {
            this.skippedDraw = 0;
            this.measure.fps.count++;
            that.ctx.save();
            this.draw_init();
            this.nodeRendered = this.layer.length;
            var layer, node, lidx, nidx = null;
            for (lidx = this.layer.data.length - 1; lidx >= 0, layer = this.layer.data[lidx]; lidx--) {
                if (layer == undefined) {
                    continue;
                }
                for (nidx = 0; nidx < layer.length, node=layer[nidx]; nidx++) {
                    this.pre_render(node);
                    this.ctx.save();
                    node.pre_render(this);
                    if (tree.hasCapability(node, eCap.transform)) {
                        wt = node.worldTransform._data;
                        this.ctx.setTransform(wt[0], wt[1], wt[3], wt[4], 
                                           wt[2], wt[5]);
                    }
                    if (tree.hasCapability(node, eCap.render)) {
                        this.apply_node_context(node);
                    }
                    this.render(node);
                    node.render(this);
                    if (this.ctx.fillStyle) {
                        this.ctx.fill();
                    }
                    if (this.ctx.strokeStyle) {
                        this.ctx.stroke();
                    }
                    this.post_render(node);
                    this.ctx.restore();
                    node.post_render(this);
                }
            };
            this.draw_end();
            that.ctx.restore();
        }
    };

    RENDERER.prototype.draw_init = function() {/* PLACE HOLDER */
        ;
    };
    RENDERER.prototype.draw_end = function() {/* PLACE HOLDER */
        ;
    };

    RENDERER.prototype.render_node = function(node, elapsed) {
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
        // this.hookExec('pre_update', node);
        this.pre_update(node, elapsed);
        node.pre_update(this, elapsed);
        if (tree.hasCapability(node, eCap.transform)) {
            this.pushTransform(node.applyWorldTransform(this.transform));
        }
        this.update(node, elapsed);
        node.update(this, elapsed);
        // this.hookExec('update', node);
        this.post_update(node, elapsed);
        node.post_update(this, elapsed);
        // this.hookExec('post_update', node);
        child = node.child.first;
        while (child != null) {
            if (this.render_node(child.content, elapsed)) {
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
