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

    var Matrix44 = require('graphit/math/matrix44');
    var math = require('graphit/math');
    var Component = require('graphit/scene/component');
    var eType = require('graphit/scene/enum/type');

    function Transform() {
        this.type = eType.transform;
        Component.call(this);
        this.world = new Matrix44();
        this._dirty = true;
    }
    Transform.prototype = Object.create(Component.prototype);

    Object.defineProperty(Transform.prototype, 'local', {
        get: function() {
            if (this._local !== undefined) {
                return this._local;
            }
            return this.world;
        }})
    ;

    Transform.prototype.localPosition = function(position) {
        if (this.local === undefined) { return this.world.position(position); }
        return this.local.position(position);
    };

    Transform.prototype.hasChanged = function() {
        return this._dirty;
    };

    Transform.prototype.localToWorldMatrix = function() {
        throw 'NotImplemented';
    };

    Transform.prototype.worldToLocalMatrix = function() {
        throw 'NotImplemented';
    };

    Transform.prototype.applyLocalTransform = function(local) {
        if (this._local === undefined) {
            this._local = this.world.clone();
        } else {
            this._local.copy(this.world);
        }
        return this._local.mul(local);
    };

    Transform.prototype.position = function(vector) {
        console.log('change position', vector);
        return this.world.position(vector);
    };

    Transform.prototype.positionX = function(x) {
        return this.world.positionX(x);
    };

    Transform.prototype.positionY = function(y) {
        return this.world.positionY(y);
    };

    Transform.prototype.translate = function(vector) {
        return this.world.translate(vector);
    };

    Transform.prototype.rotate = function(angle) {
        return this.world.rotateZ(angle);
    };

    return Transform;
});
