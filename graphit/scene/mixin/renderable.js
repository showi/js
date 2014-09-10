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
        this.pre_update = function() { return true; };
        this.update = function() { return true; };
        this.post_update = function() { return true; };
        this.pre_render = function() { return true; };
        this.render = function() { return true; };
        this.post_render = function() { return true; };
    };
});
