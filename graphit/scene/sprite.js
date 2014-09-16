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
    var math = require('graphit/math/factory');

    ns = ns.scene;
    var _ns_ = 'sprite';
    
    if (_ns_ in ns && ns[_ns_] != undefined) { return ns[_ns_]; }
    
    function SPRITE(texture, rect, pivot, pixelToUnits) {
        this.type = eType.sprite;
        BaseObject.apply(this, arguments);
        this.setUp(texture, rect, pivot, pixelToUnits);
        //        this.border = undefined;
//        this.bounds = undefined;
//        this.packed = false;
//        this.textureRect = undefined;
//        this.textureRectOffset = undefined;
    }
    
    SPRITE.prototype.setUp = function(texture, rect, pivot, pixelToUnits) {
        this.texture = texture;
        this.rect = rect.clone();
        console.log('rect', this.rect, 'texture', texture);
    };

    SPRITE.prototyep = Object.create(BaseObject.prototype);
    ns[_ns_] = SPRITE;
    return ns[_ns_];
});