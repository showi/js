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
    var Vector3d = require('graphit/math/vector3d');
    var eSleepmode = require('graphit/scene/enum/sleepmode');

    function Rigidbody2d() {
        this.type = eType.rigidbody;
        Component.call(this);
        this.angularDrag = undefined;
        this.angularVelocity = undefined;
        this.centerOfMass = undefined;
        this.collisionDetectionMode = undefined;
        this.constraints = undefined;
        this.detectCollisions = true;
        this.drag = undefined;
        this.freezeAngle = undefined;
        this.gravityScale = 0;
        this.inertia = 0;
        this.interpolation = 0;
        this.isKinematic = false;
        this.mass = 1;
        this.position = new Vector3d();
        this.rotation = 0;
        this.simulated = 0;
        this.sleepMode = eSleepmode.awake;
        this.velocity = new Vector3d();
        this.worldCenterOfMass = 0;
        this._forces = new Vector3d();
    }
    Rigidbody2d.prototype = Object.create(Component.prototype);

    Object.defineProperty(Rigidbody2d.prototype, 'mass', {
        get : function() {
            return this._mass;
        },
        set : function(mass) {
            this._invMass = 1 / mass;
            this._mass = mass;
        }
    });

    Object.defineProperty(Rigidbody2d.prototype, 'invMass', {
        get : function() {
            return this._invMass;
        },
    });

    Rigidbody2d.prototype.closestPointOnBounds = function(renderer) {
        throw 'NotImplemented';
    };
    Rigidbody2d.prototype.raycast = function(renderer) {
        throw 'NotImplemented';
    };

    Rigidbody2d.prototype.addForce = function(force) {
        this._forces.add(force);
    };

    Rigidbody2d.prototype.update = function(elapsedTime) {
        var a = this._forces.smul(this._invMass).smul(elapsedTime);
        this._forces.fill(0);
        this.velocity.add(a);
    };

    return Rigidbody2d;
});
