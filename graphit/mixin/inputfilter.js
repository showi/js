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

    return function() {
        this.inputFilter = function() {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined) {
                    throw 'UndefinedComponent';
                }
            }
        };

        this.inputFilterVector = function(vector) {
            this.inputFilter(vector.x, vector.y);
        };

        this.inputFilterMatrix = function(matrix) {
            for(var i = 0; i < matrix._data.length; i++) {
                this.inputFilter(matrix._data[i]);
            }
        };
    };
});
