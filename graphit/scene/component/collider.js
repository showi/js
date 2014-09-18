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

    var Component = require('graphit/scene/component');
    var eType = require('graphit/scene/enum/type');

    function Collider() {
        this.type = eType.collider;
        Component.call(this);
        this.attachedRigidbody = undefined;
        this.bounds = undefined;
        this.enabled = undefined;
        this.isTrigger = undefined;
        this.material = undefined;
        this.sharedMaterial = undefined;
    }
    Collider.prototype = Object.create(Component.prototype);

    Collider.prototype.closestPointOnBounds = function(renderer) {
        throw 'NotImplemented';
    };
    Collider.prototype.raycast = function(renderer) {
        throw 'NotImplemented';
    };
    return Collider;
});
