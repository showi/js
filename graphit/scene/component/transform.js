define(function(require) {
    'use strict';

    var namespace = require('graphit/namespace');
    var ns = namespace.scene;
    var Matrix33 = require('graphit/math/matrix33');
    var math = require('graphit/math');
    var Component = require('graphit/scene/component');
    var eType = require('graphit/scene/enum/type');
    var _ns_ = eType.reverse(eType.transform);
    
    if (_ns_ in ns && ns[_ns__] != undefined) {
        return ns[_ns_];
    }
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
        if (this.local === undefined) {
            return this.world.position(position);
        }
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

    ns[_ns_] = Transform;
    return ns[_ns_];
});
