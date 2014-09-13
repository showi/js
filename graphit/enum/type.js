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
    ns = ns.enum;
    var _ns_ = 'type';
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var TYPE = new Enum({
        rect: 1 << 1,
        vector2d: 1 << 2,
        matrix33: 1 << 3,
        image: 1 << 4,
        spritepack: 1 << 5,
        sceneNodeShap: 1 << 6,
    });
    TYPE.__namespace__ = 'graphit/enum/type';

    ns[_ns_] = TYPE;
    return ns[_ns_];
});
