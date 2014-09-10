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

    var eCap = require('graphit/enum/capability');

    var UTIL = {
        setCapability : function(obj, capability) {
            obj.capability |= capability;
        },
        unsetCapability : function(obj, capability) {
            obj.capability &= (obj.capability & ~capability);
        },
        hasCapability : function(obj, capability) {
            if ((obj.capability & capability) == capability) { return true; }
            return false;
        },
    };
    UTIL.__namespace__ = 'graphit/scene/util';
    return UTIL;
});
