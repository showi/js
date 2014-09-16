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

    var MATRIX33 = new Enum({
        m11 : 0,
        m12 : 1,
        m13 : 2,
        m21 : 3,
        m22 : 4,
        m23 : 5,
        m31 : 6,
        m32 : 7,
        m33 : 8,

        mX : 2, // m13,
        mY : 5, // m23,
        mSx : 0,
        mSy : 4,
    });

    MATRIX33.__namespace__ = 'graphit/enum/matrix33';
});
