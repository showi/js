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

    if (typeof String.prototype.startsWith != 'function') {
        util.log('String', 'startsWith');
        String.prototype.startsWith = function(str) {
            return this.slice(0, str.length) == str;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        util.log('String', 'endsWith');
        String.prototype.endsWith = function(str) {
            return this.slice(-str.length) == str;
        };
    }

});
