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
    var Grid = require('tile/grid');
    var Renderer = require('tile/renderer');
    var Canvas = require('graphit/draw/canvas');
    var Matrix33 = require('graphit/math/matrix33');
    var Mob = require('tile/mob');
    var math = require('graphit/math');
    var sm = require('tile/sm');
    var body = jQuery('body');
    var util = require('graphit/util');
    var size = util.windowSize();
    var width = 800;
    var height = 600;
    console.log('Width/Height', width, height);
    var canvas = new Canvas({
        width : width,
        height : height
    });
    body.append(canvas.element);
    var ctx = canvas.getCtx();
    var worldTransform = new Matrix33();
    // worldTransform.translateXY(width/2.5, height / 0.9);
    // worldTransform.scale(0.5, 0.5);
    console.log('WorldTransform', worldTransform._data);
    var grid = new Grid(1, 1, 8, 8, 128, 64);
    grid.getJson('level/test.json', function(data) {
        function wait(timeout) {
            console.log('Loading', grid.loading);
            if (grid.loading < 1) {
                console.log('Loading finished');
//                render();
                console.log(data);
                render(width, height);
                return;
            }
            setTimeout(wait, timeout);
        }
        setTimeout(wait, 250);
    });
    
 function render(width, height) {
     console.log('rendering map');
    var ratioX = width / grid.width;
    var ratioY = height / grid.height;
    console.log('Grid', grid);
    var numMob = 0;
    var mobs = [];
    for (var i = 0; i < numMob; i++) {
        var mob = new Mob(math.randInt(0, grid.width), math
                .randInt(0, grid.height));
        grid.appendNpc(mob);
        mobs.push(mob);
    }
    var renderer = new Renderer(grid);
    renderer.worldTransform = worldTransform;
//
//    var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1,
//                2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 1,
//                1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
//                0, ];
//    var tiles = {
//        0 : {
//            fillStyle : 'grey'
//        },
//        1 : {
//            fillStyle : 'green'
//        },
//        2 : {
//            fillStyle : 'blue'
//        }
//    };
//    for (var i = 0; i < grid.cell.length; i++) {
//        for (var j = 0; j < grid.cell[i].tile.length; j++) {
//
//            var t = tiles[data[j]];
//            if (t === undefined) {
//                continue;
//            }
//            if (t.fillStyle !== undefined) {
//                grid.cell[i].tile[j].fillStyle = t.fillStyle;
//            }
//        }
//    }
//    ctx.save();
//    ctx.fillColor = 'white';
//    ctx.fillRect(0, 0, width, height);
//    ctx.restore();
    var now, elapsed,  mob;
    var startTime = Date.now();
    console.log(mobs.length);
    function loop() {
        now = Date.now();
        elapsed = now - startTime;
        startTime = Date.now(); 
        for(var i = 0; i < mobs.length ; i++) {
            if (mob.position.x < 0 || mob.position.x > grid.width) {
                mob.orientation.inverseX();
            }
            if (mob.position.y < 0 || mob.position.y > grid.height) {
                mob.orientation.inverseY();
            }
            var speed = mob.orientation.clone().mul(mob.velocity).smul(elapsed);
            mob.position.add(speed);
        }
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0, width, height);
        ctx.translate(width/2, (height / 2));
//        ctx.scale(0.5, 0.5);
        renderer.draw(ctx);
        ctx.restore();
        setTimeout(loop, 20000);
    }
    loop();
}
});
