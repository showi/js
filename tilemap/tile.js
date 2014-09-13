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
    
    var namespace = require('graphit/namespace');
    
    function Tile(parent) {
        this.uid = namespace.genUID();
        this.setUp(parent);
        this.behaviorFlag = 0;
        this.texture = undefined;
        this.fillStyle = undefined;
        this.strokeStyle = undefined;
    }

    Tile.prototype.setBehaviore = function(behaviore) {
        this.behaviorFlag |= bahaviore;
    };

    Tile.prototype.setUp = function(parent) {
        this.parent = parent;
    };

    return Tile;
});