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
    var Asset = require('graphit/asset/manager');

    function log() {
        console.log.apply(console, arguments);
    }

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
        this.loading = 0;
    };

    Grid.prototype.loadJson = function(data) {
        this.loading = 0;
        this.json = data;
        log('>>>>> loadJson', this.json);
        this.setUp(1, 1, data.width, data.height, data.tilewidth, data.tileheight);
//        this.col = this.row = 1
//        this.cellCol = data.width;
//        this.cellRow = data.height;
//        this.tileHeight = data.tileheight;
//        this.tileWidth = data.tilewidth;
//        this.cellWidth = this.col * this.tileWidth;
//        this.cellHeight = this.row * this.tileHeight;
        this.version = data.version;
        this.orientation = data.orientation;
//        this.width = data.width * data.tilewidth;
//        this.height = data.height * data.tileheight;
//        this.rect = new Rect(0, 0, this.width, this.height);

        this.loadTileSets(this.json.tilesets);
        this.cell = [];
        for (var i = 0; i < (this.col * this.row); i++) {
            var c = new Cell(this.cellCol, this.cellRow,
                                    this.tileWidth,
                                    this.tileHeight);
            c.parent = this;
            this.cell[i] = c;
        }
    };

    Grid.prototype.loadTileSets = function(tilesets) {
        var that = this;
        var i, tileset, nt;
        this.loading++;
        for (i = 0; i < tilesets.length, tileset = tilesets[i]; i++) {
            var url = tileset.image.slice(3, tileset.image.length);
            console.log(i, 'Loading tilesets', tileset.name, url, tileset);
            Asset.loadTileset(tileset.name, url, function() {
                this.json = tileset;
                that.loading--;
            });
        }
    };

    Grid.prototype.getJson = function(cellNumber, url, fn) {
        if (this.cell.length < cellNumber) {
            throw 'InvalidCellNumber:' + cellNumber;
        }
        var that = this;
        function load(data) {
            that.loadJson(data);
            if (fn !== undefined) {
                fn.call(that, data);
            }
        };
        jQuery.getJSON(url, load);
    };

    Grid.prototype.get = function(x, y) {
        var idx = y * this.col + x;
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
