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

    var Enum = require('graphit/enum');

    var CAPABILITY = new Enum({
        gameobject: 1 << 0,
        component: 1 << 1,
        transform: 1 << 2,
        texture: 1 << 3,
        texture2d: 1 << 4,
        sprite: 1 << 5,
        renderer: 1 << 6,
        collider: 1 << 7,
        rigidbody: 1 << 8,
    });
    CAPABILITY.__namespace__ = 'graphit/enum/capability';
    return CAPABILITY;
});
