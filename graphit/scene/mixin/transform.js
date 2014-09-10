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

    var eCap = require('graphit/enum/capability');
    var util = require('graphit/scene/util');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');

    function TRANSFORM() {
        Object.defineProperty(this, 'worldTransform', {
            get: function() {
                if (this._worldTransform === undefined) {
                return this.transform;
                }
                return this._worldTransform;
            },
            set: function(world) {
                if (this._worldTransform === undefined) {
                    this._worldTransform = this.transform.clone();
                } else {
                    this._worldTransform.copy(this.transform);
                }
                this._worldTransform.mul(world);
                
            },
        });
        this.enable_transform = function() {
            this.transform = new Matrix33();
            this._worldTransform = undefined;
//            this.worldTransform = new Matrix33();
            util.setCapability(this, eCap.transform);
        };
        this.disable_transform = function() {
            util.setCapability(this, eCap.transform);
            delete this.transform;
            delete this._worldTransform;
        };
        this.applyWorldTransform = function(world) {
            if (world === undefined) {
                throw 'UndefinedWorldTransform';
            }
            this.worldTransform = world;
            return this.worldTransform;
        };
        this.getWorldTransform = function() {
            return this.worldTransform;
        };
        this.getParentWorldTransform = function() {
            if (util.hasCapability(this, eCap.transform)) { return this.worldTransform; }
            if (this.parent == undefined || this.parent == null) { return new Matrix33(); }
            return this.parent.getParentWorldTransform();

        }, this.rotate = function(angle) {
            return this.transform.rotate(angle);
        };
        this.translate = function(vector) {
            return this.transform.translate(vector);
        };
        this.translateX = function(x) {
            return this.transform.translateX(x);
        };
        this.translateY = function(y) {
            return this.transform.translateY(y);
        };
        this.translateXY = function(x, y) {
            return this.transform.translateXY(x, y);
        };
        this.position = function(vector) {
            return this.transform.position(vector);
        };
        this.positionX = function(x) {
            return this.transform.positionX(x);
        };
        this.positionY = function(y) {
            return this.transform.positionY(y);
        };
        this.positionXY = function(x, y) {
            return this.transform.positionXY(x, y);
        };
        this.scale = function(scale) {
            return this.transform.scale(scale);
        };
    }
    TRANSFORM.__namespace__ = 'graphit/scene/mixin/transform';

    return TRANSFORM;
});
