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
    var Vector2d = require('graphit/math/vector2d');

    function Rigidbody() {
        this.type = eType.rigidbody;
        Component.call(this);
        this.angularDrag = undefined;
        this.angularVelocity = undefined;
        this.centerOfMass = undefined;
        this.collisionDetectionMode = undefined;
        this.constraints = undefined;
        this.detectCollisions = true;
        this.drag = undefined;
        this.freezeRotaiton = undefined;
        this.inertiaTensor = undefined;
        this.inertiaTensorRotation = undefined;
        this.isKinematic = undefined;
        this.mass = undefined;
        this.maxAngularVelocity = undefined;
        this.position = new Vector2d(0, 0);
        this.rotation = 0;
        this.sleepAngularVelocity = 0.14;
        this.sleepVelocity = 0.14;
        this.solverIterationCount = undefined;
        this.useConeFriction = undefined;
        this.useGravity = undefined;
        this.velocity = new Vector2d(0, 0);
        this.worldCenterOfMass = undefined;
    }
    Rigidbody.prototype = Object.create(Component.prototype);

    Rigidbody.prototype.closestPointOnBounds = function(renderer) {
        throw 'NotImplemented';
    };
    Rigidbody.prototype.raycast = function(renderer) {
        throw 'NotImplemented';
    };
    return Rigidbody;
});
