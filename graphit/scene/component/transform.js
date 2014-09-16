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

    var Matrix33 = require('graphit/math/matrix33');
    var math = require('graphit/math');
    var Component = require('graphit/scene/component');
    var eType = require('graphit/scene/enum/type');

    function Transform() {
        this.type = eType.transform;
        Component.call(this);
        this.world = new Matrix33();
        this.local = new Matrix33();
        this._dirty = true;
    }
    Transform.prototype = Object.create(Component.prototype);

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

    Transform.prototype.applyLocalTransform = function(world) {
        return this.local.copy(this.world).mul(world);
    };

    Transform.prototype.position = function(vector) {
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

    return Transform;
});
