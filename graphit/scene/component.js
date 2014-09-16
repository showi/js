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

    function COMPONENT() {
        this.type = eType.component;
        BaseObject.apply(this, arguments);
    };
    
    COMPONENT.prototype = Object.create(BaseObject.prototype);

    COMPONENT.__namespace__ = 'graphit/scene/component';

    return COMPONENT;
});
