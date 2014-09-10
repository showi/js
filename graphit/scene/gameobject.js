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

    var BaseObject = require('graphit/scene/baseobject');
    var Line = require('graphit/math/line');
    var ns = require('graphit/namespace');
    ns = ns.scene.node;
    var shape = require('graphit/draw/shape');
    var util = require('graphit/scene/util');
    var eCap = require('graphit/enum/capability');
    var eType = require('graphit/scene/enum/type');

    var _ns_ = 'gameobject';

    if (_ns_ in ns && ns[_ns_] != undefined) {
        return ns[_ns_];
    }

    function GAMEOBJECT() {
        this.type = eType.gameobject;
        BaseObject.apply(this, arguments);
        this.component = {};
    };
    GAMEOBJECT.prototype = Object.create(BaseObject.prototype);
    GAMEOBJECT.__namespace__ = 'graphit/scene/gameobject';
    
    GAMEOBJECT.prototype.getComponent = function(name) {
        if (name in this.component) { return this.component[name]; }
        return null;
    };

    GAMEOBJECT.prototype.addComponent = function(cls) {
        var name = cls.name;
        name = name.toLowerCase();
        if (name in this.component) { throw 'ComponentAlreadyAttached'; }
        this.component[name] = new cls(this);
        Object.defineProperty(this, name, {
            get: function() {
                if (!(name in this.component)) {
                    return null;
                }
                return this.component[name];
            },
        });
    };
    ns[_ns_] = GAMEOBJECT;
    return ns[_ns_];
});
