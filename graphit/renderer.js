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
    var RenderableMixin = require('graphit/scene/mixin/renderable');
    var tree = require('graphit/scene/util');
    var eCap = require('graphit/enum/capability');
    var eMat = require('graphit/enum/matrix33');
    var eCtx = require('graphit/enum/context');
    var Node = require('graphit/scene/node/node');
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
            required : true,
            defaultValue : {

            },
        },
        'worldTransform' : {
            required : true,
            defaultValue : new Matrix33(),
        },
        'canDraw' : {
            required : true,
        }
    };

    function RENDERER() {
        this.isPaused = false;
        Object.defineProperty(this, 'pause', {
            get : function() {
                return this.isPaused;
            },
            set : function(v) {
                this.isPaused = v;
            }
        });
        this.now = Date.now();
        this.uid = util.genUID();
        this.setParameters(arguments, VALIDATOR);
        this.startTime = Date.now();
        this.endTime = null;
        this.skipped = 0;
        this.skippedDraw = 0;
        this.numUpdate = 0;
        this.fixedUpdate = 33;
        this.fixedDraw = 100;
        this.timeout = 0;
        this.updateAdder = 0;
        this.limitUpdate = 3;
        this.limitSkippedDraw = 3;
        this.limitSkippedRender = 2;
        // this.limitFps = 20;
        this.nodeRendered = 0;
        this.maxUps = 120;
        this.transforms = [];
        this.transform = undefined;
        this.layer = new Layer();
        this.noBrowserDraw = false;
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
        this.setCtx(this.ctx);
    }
    RENDERER.__namespace__ = 'graphit/renderer';
    ParameterMixin.call(RENDERER.prototype);
    RenderableMixin.call(RENDERER.prototype);

    RENDERER.prototype.setCtx = function(ctx) {
        ctx.fillStyle = null;
        ctx.strokeStyle = null;
        this.ctx = ctx;
        this.apply_node_context(this.compositing);
    };

    RENDERER.prototype.pushTransform = function(transform) {
        this.transforms.push(transform);
        this.transform = transform;
        return this;
    };

    RENDERER.prototype.popTransform = function() {
        var elm = this.transforms.pop();
        this.transform = elm;
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
        if (node === undefined) { throw 'RENDERERUndefinedNode'; }
        for (i = 0; i < eCtx._keys.length, key = eCtx._keys[i]; i++) {
            if (node[key] === undefined) {
                continue;
            }
            if (node[key] != this.ctx[key]) {
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
        var wt = null;

        this.elapsedTime = 0;
        if (delta > (this.fixedUpdate * 100)) {
            this.noBrowserDraw = true;
        } else {
            if (this.noBrowserDraw) {
                this.noBrowserDraw = false;
                this.pause = false;
            }
        }
        if (this.pause) {
            return;
        } else {
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
                }
            }
        }
        if (doUpdate == false) {
            this.skipped++;
        } else {
            this.skipped = 0;
            this.layer.empty();
            this.measure.ups.count++;
            util.emptyArray(this.transforms);
            this.pushTransform(this.worldTransform);
            if (this.render_node(this.root, this.elapsedTime)) {
                this.layer.append(this.root);
            }
        }
        if (this.canDraw) {
            this.canDraw = false;
            doDraw = true;
        }
        doDraw = false;
        if (doDraw == false && (this.skippedDraw < this.limitSkippedDraw)) {
            this.skippedDraw++;
        } else {
            this.skippedDraw = 0;
            this.measure.fps.count++;
            that.ctx.save();
            this.draw_init();
            this.nodeRendered = this.layer.length;
            var layer, node, lidx, nidx = null;
            for (lidx = this.layer.data.length - 1;
                 lidx >= 0, layer = this.layer.data[lidx]; lidx--) {
                if (layer == undefined) {
                    continue;
                }
                for (nidx = 0; nidx < layer.length, node = layer[nidx]; nidx++) {
                    this.pre_render(node);
                    this.ctx.save();
                    node.pre_render(this);
                    if (tree.hasCapability(node, eCap.transform)) {
                        wt = node.worldTransform._data;
                        this.ctx.translate(wt[2], wt[5]);
                        // this.ctx.seTransform(wt[0], wt[1], wt[3], wt[4],
                        // wt[2],
                        // wt[5]);
                    }

                    this.apply_node_context(node);
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
        var ret = tree.hasCapability(node, eCap.render);
        /* PRE UPDATE */
        this.pre_update(node, elapsed);
        node.pre_update(this, elapsed);

        /* UPDATE */
        if (!this.update(node, elapsed)) {
            return ret;
        }
        node.update(this, elapsed);
        if (tree.hasCapability(node, eCap.transform)) {
            node.worldTransform = this.transform;
        }
        /* POSTUPDATE */
        this.post_update(node, elapsed);
        node.post_update(this, elapsed);
        if (node.child !== undefined) {
            
            /* RENDERING CHILD */
            child = node.child.first;
            while (child != null) {
                if (tree.hasCapability(child.content, eCap.prune)) {
                    child = node.child.remove(child);
                    continue;
                }
                /* TRANSFORM PUSH */
                if (tree.hasCapability(child.content, eCap.transform)) {
                    this.pushTransform(this.transform);
                }
                if (this.render_node(child.content, elapsed)) {
                    this.layer.append(child.content);
                }
                
                /* TRANSFORM POP */
                if (tree.hasCapability(child.content, eCap.transform)) {
                    this.popTransform();
                }
                child = child.next;
            }
        }
        /* TRUE if Drawable */
        return ret;   
    };

    return RENDERER;
});
