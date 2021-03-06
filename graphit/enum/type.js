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

    var TYPE = new Enum({
        rect : 1 << 1,
        vector3d : 1 << 2,
        matrix33 : 1 << 3,
        matrix44: 1 << 4,
        image : 1 << 5,
        spritepack : 1 << 6,
        tileset : 1 << 7,
        sceneNodeShap : 1 << 8,
        level: 1 << 9,
    });
    TYPE.__namespace__ = 'graphit/enum/type';

    return TYPE;
});
