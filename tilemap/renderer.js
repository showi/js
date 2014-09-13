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
    
    var Vector2d = require('graphit/math/vector2d');

    function Renderer(grid) {
        this.grid = grid;
        this.ctx = undefined;
    }

    Renderer.prototype.setUp = function(grid, ctx) {
        this.grid = grid;
        this.ctx = ctx;
        this.worldTransform = undefined;
    };

    Renderer.prototype.draw = function(ctx) {
        var dtw = this.grid.width / 2;
        var dth = this.grid.height / 2;
        ctx.save();
        this.npc = [];
        if (this.worldTransform !== undefined) {
//            console.log('translating', this.worldTransform._data);
            ctx.translate(this.worldTransform._data[2],
                          this.worldTransform._data[5]);
//            ctx.scale(0.4, 0.4);
        }
//        console.log('grid w/h', this.grid.width, this.grid.height);
        var i, j, cell;
        var dcw = this.grid.cell[0].width / 2;
        var dch = this.grid.cell[0].height / 2;
        for (i = 0; i < this.grid.col; i++) {
            for (j = 0; j < this.grid.row, cell=this.grid.get(i, j); j++) {
//                console.log('Drawing cell', cell);
                ctx.save();
                ctx.translate((j * dcw) + (i * dcw), (i * dch) - (j * dch));
                this.drawDiamond(ctx, cell);
                ctx.restore();
                this.pushNpc(cell);
   
            }
        }
        this.drawNpc(ctx);
        ctx.restore();
        return true;
    };

    Renderer.prototype.drawDiamond = function(ctx, grid) {
        var i, j;
        var dtw = grid.tileWidth / 2;
        var dth = grid.tileHeight / 2;
        for (i = 0; i < grid.col; i++) {
            for (j = 0; j < grid.row; j++) {
                drawTile_ground(ctx, (j * dtw) + (i * dtw), (i * dth)
                        - (j * dth), grid.get(i, j));
            }
        }
    };

    Renderer.prototype.pushNpc = function(cell) {
        var i, npc;
        for(i = 0; i < cell.npc.length, npc=cell.npc[i]; i++) {
            this.npc.push(npc);
        }
    };
    
    Renderer.prototype.drawNpc = function(ctx) {
        var i, npc;
        for(i = 0; i < this.npc.length, npc=this.npc[i]; i++) {
//            this.npc.push(npc)
//            console.log('Drawing npc', npc);
            ctx.save();
            var pos = this.gridCoordinate(npc.position.x, npc.position.y, this.grid.tileWidth);
//            pos.x = pos.x*cell.tileWidth/2;
//            pos.y = pos.y*cell.tileHeight/2;
//            console.log('npc position in diamond', pos.x, pos.y, this.grid.tileWidth);
            pos.x = pos.x * this.grid.tileWidth / 2;
            pos.y = pos.y * this.grid.tileHeight / 2 + 32;
//            console.log('npc position in diamond', pos.x, pos.y, npc);
//            throw 'plop';
            ctx.translate(pos.x, pos.y);
            ctx.fillStyle = npc.fillStyle;
            npc.draw(ctx);
            ctx.restore();
        }
    };
    Renderer.prototype.gridCoordinate = function(px, py, diag) {
        var r = 2;
//        var xi = Math.floor(px/diag + r*py/diag);
//        var yi = Math.floor(r*py/diag - px/diag);
        var xi = px/diag + r*py/diag;
        var yi = r*py/diag - px/diag;
        return new Vector2d(xi, yi);
    };
    
    function drawTile_ground(ctx, x, y, tile) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(64, 32);
        ctx.lineTo(128, 64);
        ctx.lineTo(64, 96);
        ctx.lineTo(0, 64);
        ctx.closePath();
        if (tile.fillStyle !== undefined) {
            ctx.fillStyle = tile.fillStyle;
            ctx.fill();
        }
        if (tile.strokeStyle !== undefined) {
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }

    return Renderer;
});
