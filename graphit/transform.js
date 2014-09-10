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

    var Matrix33 = require('graphit/math/matrix33');

    function TRANSFORM() {
        this.transform = new Matrix33();
        Object.defineProperty(this, 'world', {
            get : function() {
                if (this._world === undefined) { return this.transform; }
            },
            set : function(world) {
                if (this._world === undefined) {
                    this._world = world.clone();
                } else {
                    this._world.copy(world);
                    this._world.mul(this.transform);
                }

            }
        });
    }
});
