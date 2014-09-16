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

    var CONTEXT = new Enum({
        fillStyle : true,
        strokeStyle : true,
        shadowColor : true,
        shadowBlur : true,
        shadowOffsetX : true,
        shadowOffsetY : true,
        lineWidth : true,
        lineCap : true,
        lineJoin : true,
        miterLimit : true,
        font : true,
        textAlign : true,
        textBaseline : true,
        globalAlpha : true,
        globalCompositeOperation : true,
    });
    CONTEXT.__namespace__ = 'graphit/enum/context';
    
    return CONTEXT;
});
