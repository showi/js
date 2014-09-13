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
    var Cell = require('tile/cell');
    var Vector2d = require('graphit/math/vector2d');

    function Grid(col, row, cellCol, cellRow, tileWidth, tileHeight) {
        this.setUp(col, row, cellCol, cellRow, tileWidth, tileHeight);
    }

    Grid.prototype.setUp = function(col, row, cellCol, cellRow, tileWidth,
                                    tileHeight) {
        this.character = [];
        this.col = col;
        this.row = row;
        this.cellCol = cellCol;
        this.cellRow = cellRow;
        this.cellWidth = cellCol * tileWidth;
        this.cellHeight = cellRow * tileHeight;
        this.cell = [];
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.width = col * cellCol * tileWidth;
        this.height = row * cellRow * tileHeight;
        this.rect = new Rect(0, 0, this.width, this.height);
        var numCell = col * row;
        for (var i = 0; i < numCell; i++) {
            this.cell[i] = new Cell(cellCol, cellRow, tileWidth, tileHeight);
        }
    };

    Grid.prototype.get = function(x, y) {
        var idx = y * this.col + x;
//        console.log('idx', idx);
        return this.cell[idx];
    };

    Grid.prototype.appendNpc = function(npc) {
        console.log('npc', npc, this);
        if (!this.rect.contains(npc.position)) { throw 'ThisNpcDoesntBelongToUs'; }
        console.log('Inserting npc');
        var cc = this.cellCoorFromPosition(npc.position);
        console.log('grid position', cc);
        var cell = this.get(cc.x, cc.y);
        cell.appendNpc(npc);
    };

    Grid.prototype.cellCoorFromPosition = function(position) {
//        console.log('position', position, this.cellWidth, this.cellHeight, position.x, this.cellWidth);
        var x, y;
        if (position.x == this.cellWidth) {
            x = this.col - 1;
        } else if (position.x == 0) {
            x = 0;
        } else {
            x = Math.floor(position.x / this.cellWidth);
        }
        if (position.y == this.cellHeight) {
            y = this.row - 1;
        } else if (position.y == 0) {
             y = 0;
        } else {
            y = Math.floor(position.y / this.cellHeight);
        }
        return new Vector2d(x, y);
    };

    return Grid;
});
