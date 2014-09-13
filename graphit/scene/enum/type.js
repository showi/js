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

    var ns = require('graphit/namespace');
    var Enum = require('graphit/enum');
    ns = ns.scene.enum;
    var _ns_ = 'type';
    console.log('namespace', ns);
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var CAPABILITY = new Enum({
        gameobject: 1 << 0,
        component: 1 << 1,
        transform: 1 << 2,
        texture: 1 << 3,
        texture2d: 1 << 4,
        sprite: 1 << 5,
    });
    CAPABILITY.__namespace__ = 'graphit/enum/capability';

    ns[_ns_] = CAPABILITY;
    return ns[_ns_];
});
