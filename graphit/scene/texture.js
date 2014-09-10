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
    var BaseObject = require('graphit/scene/baseobject');
    var eType = require('graphit/scene/enum/type');
    ns = ns.scene;
    var _ns_ = eType.reverse(eType.texture);

    if (_ns_ in ns && ns[_ns_] != undefined) { return ns[_ns_]; }

    function TEXTURE() {
        this.type = eType.texture;
        BaseObject.apply(this, arguments);
        this.anisoLevel = 0;
        this.filterMode = 0;
        this.height = 0,
        this.width = 0;
        this.wrapMode = 0;
    };
    
    TEXTURE.prototype = Object.create(BaseObject.prototype);

    TEXTURE.__namespace__ = 'graphit/scene/texture';

    TEXTURE.prototype.getNativeTextureID = function() {
        throw 'NotImplementedError';
    };
    TEXTURE.prototype.getNativeTexturePtr = function() {
        throw 'NotImplementedError';
    };
    ns[_ns_] = TEXTURE;
    return ns[_ns_];
});
