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
    var Texture = require('graphit/scene/texture');
    var eType = require('graphit/scene/enum/type');
    ns = ns.scene;
    var _ns_ = eType.reverse(eType.texture2d);

    if (_ns_ in ns && ns[_ns_] != undefined) { return ns[_ns_]; }

    function TEXTURE2D(width, height, format, mipmap, linear) {
        Texture.apply(this, arguments);
        if (width === undefined) {
            throw 'MissingWidth';
        }
        if (height === undefined) {
            throw 'MissingHeight';
        }
        this.width = width;
        this.height = height;
        this.format = (format === undefined)? 'RGBA32': format;
        this.linear = (linear === undefined)? true: linear;
    };
    
    TEXTURE2D.prototype = Object.create(Texture.prototype);

    TEXTURE2D.__namespace__ = 'graphit/scene/texture/texture2d';

    TEXTURE2D.prototype.loadImage = function(name) {
        
    
    };
    ns[_ns_] = TEXTURE2D;
    return ns[_ns_];
});
