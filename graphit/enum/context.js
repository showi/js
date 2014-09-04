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
    var _ns_ = 'context';
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_];}

    var Context = new Enum({
        fillStyle : true,
        strokeStyle : true,
        shadowColor: true,
        shadowBlur: true,
        shadowOffsetX: true,
        shadowOffsetY: true,
        lineWidth : true,
        lineCap: true,
        lineJoin : true,
        miterLimit: true,
        font: true,
        textAlign: true,
        textBaseline: true,
        globalAlpha: true,
        globalCompositeOperation: true,
    });
   
    ns[_ns_] = Context;
    return ns[_ns_];
});
