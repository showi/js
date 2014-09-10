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


    var namespace = require('graphit/namespace');
    var ns = namespace.scene;
    var _ns_ = 'baseobject';

    if (_ns_ in ns && ns[_ns_] != undefined) {
        return ns[_ns_];
    }

    function BASEOBJECT() {
        if (this.type === undefined) {
            throw 'UndefinedGameObjectType';
        }
        this.instanceId = namespace.genUID();
    };

    BASEOBJECT.prototype.getInstanceID = function() {
        return this.instanceId;
    };
    BASEOBJECT.__namespace__ = 'graphit/scene/baseobject';
     
    BASEOBJECT.prototype.toString = function() {
        var s = "<Gamobject\n";
        for (var key in this) {
            s+=" - "+key+": "+this[key]+"\n";
        }
    } 
    ns[_ns_] = BASEOBJECT;
    return ns[_ns_];
});
