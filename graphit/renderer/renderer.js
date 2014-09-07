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
        'worldTransform': {
            required: true,
            defaultValue: new Matrix33(),
        }
    };

    function RENDERER() {
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
        this.nodeRendered = 0;
        this.maxUps = 120;
        this.transforms = [];
        this.transform = undefined;
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
        this.transforms.push(transform);
        this.transform = transform;
        return this;
    };
    
    RENDERER.prototype.popTransform = function() {
        this.transform = this.transforms.pop();
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
        var delta = (Date.now() - this.startTime);
        this.startTime = Date.now();
        var doDraw = false;
        var doUpdate = false;
        var nodes = undefined;
        this.drawAdder += delta;
        this.updateAdder += delta;
        if (this.updateAdder >= this.fixedUpdate) {
            var numUpdate = 0;
            doUpdate = true;
            numUpdate = Math.floor(this.updateAdder / this.fixedUpdate);
            if (this.ups() > this.maxUps) {
                numUpdate--;
            }
            if (numUpdate < 1) {
                numUpdate = 1;
            } else if (numUpdate > this.limitUpdate) {
                numUpdate = this.limitUpdate;
            }
            this.numUpdate = numUpdate;
        }
        if (this.drawAdder >= this.fixedDraw) {
            doDraw = true;
        }
        var that = this;
        if (doUpdate == false) {
            this.skipped++;
        } else {
            this.skipped = 0;
            for (var i = 0; i < this.numUpdate; i++) {
                nodes = [];
                this.measure.ups.count++;
                this.transforms = [];
                this.pushTransform(this.worldTransform);
                this.updateAdder -= (this.fixedUpdate);
                this.root.preTraverse(function(node) {
                    that.hookExec('pre_update', node);
                    if (tree.hasCapability(node, eCap.transform)) {
                        that.pushTransform(node.applyWorldTransform(that.transform));
                    }
                    that.hookExec('update', node);
                    that.hookExec('post_update', node);
                    that.popTransform();
                    if (doDraw) {
                        if (tree.hasCapability(node, eCap.draw)) {
                            nodes.push(node);
                        }
                    }

                });
            }
        }
        if (doDraw == false) {
            this.skippedDraw++;
        } else {
            this.skippedDraw = 0;
            this.drawAdder -= (this.fixedDraw * this.numUpdate);
            this.measure.fps.count++;
            that.ctx.save();
            that.apply_node_context(this.compositing);
            that.hookExec('draw_init');
            this.nodeRendered = nodes.length;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
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
                that.hookExec('post_render', node);
                that.ctx.restore();
            }
            that.hookExec('draw_end');
            that.ctx.restore();
        }
    };

    return RENDERER;
});
