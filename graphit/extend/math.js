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

    var util = require('graphit/extend/util');

    if (typeof Math.randInt != 'function') {
        util.log('Math', 'randInt');
        Math.randInt = function(a, b) {
            return Math.floor((Math.random() * b) + a);
        };
    }
    if (typeof Math.randFloat != 'function') {
        util.log('Math', 'randFloat');
        Math.randFloat = function(a, b) {
            return Math.random() * b + a;
        };
    }
});
