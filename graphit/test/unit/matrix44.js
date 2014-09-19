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
    
    var Matrix44 = require('graphit/math/matrix44');

    function T_MATRIX44() {
    }

    T_MATRIX44.prototype.run = function() {
        console.log('Matrix44', Matrix44);
        var a = new Matrix44();
        console.log('Matrix44', a.toString());
    };

    T_MATRIX44.prototype.test_mul = function() {

    };
    
    return new T_MATRIX44();
});
