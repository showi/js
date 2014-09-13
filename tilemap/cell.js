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

    var Rect = require('graphit/math/rect');
    var Tile = require('tile/tile');

    function Cell(col, row, cellWidth, cellHeight) {
        this.setUp(col, row, cellWidth, cellHeight);
    }

    Cell.prototype.setUp = function(col, row, cellWidth, cellHeight) {
        this.parent = undefined;
        this.npc = [];
        this.col = col;
        this.row = row;
        this.tile = [];
        this.tileWidth = cellWidth;
        this.tileHeight = cellHeight;
        this.width = col * cellWidth;
        this.height = row * cellHeight;
        this.rect = new Rect(0, 0, col*cellWidth, row*cellHeight);
        var numCell = col * row;
        for (var i = 0; i < numCell; i++) {
            this.tile[i] = new Tile();
        }
    };
    
    Cell.prototype.get = function(x, y) {
        var idx = y * this.col + x;
        return this.tile[idx];
    };

    Cell.prototype.appendNpc = function(npc) {
        console.log('appending npc in cell', npc);
        this.npc.push(npc);
    };
    
    Cell.prototype.worldToCellCoord = function(position) {
        
    };

    return Cell;
});