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

    Transform.prototype.position = function(position) {
        return this.world.position(postion);
    };

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
        return this.local.position(vector);
    };

    Transform.prototype.positionX = function(x) {
        return this.local.positionX(x);
    };

    Transform.prototype.positionY = function(y) {
        return this.local.positionY(y);
    };

    Transform.prototype.translate = function(vector) {
        return this.local.translate(vector);
    };

    return Transform;
});
