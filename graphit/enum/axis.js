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

    var AXIS = new Enum({
        uColor : 'blue',
        vColor : 'green',
        wColor : 'red',
    });
    AXIS.__namespace__ = 'graphit/enum/axis';

    return AXIS;
});
