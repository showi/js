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

    var BaseObject = require('graphit/scene/baseobject');
    var eType = require('graphit/scene/enum/type');
    var math = require('graphit/math/factory');
    
    function SPRITE(texture, rect, pivot, pixelToUnits) {
        this.type = eType.sprite;
        BaseObject.apply(this, arguments);
        this.setUp(texture, rect, pivot, pixelToUnits);
    }
    
    SPRITE.prototype.setUp = function(texture, rect, pivot, pixelToUnits) {
        this.texture = texture;
        this.rect = rect.clone();
        console.log('rect', this.rect, 'texture', texture);
    };

    SPRITE.prototyep = Object.create(BaseObject.prototype);
    return SPRITE;
});