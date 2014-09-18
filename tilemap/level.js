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

    var GameObject = require('graphit/scene/gameobject');
    var Grid = require('tile/grid');
    var Gevent = require('graphit/event');
    var eType = require('graphit/enum/type');

    function Level(name, col, row, cellCol, cellRow, tileWidth, tileHeight) {
        this.type = eType.level;
        GameObject.call(this);
        this.name = name;
        this.grid = new Grid(col, row, cellCol, cellRow, tileWidth, tileHeight);
        this.event = new Gevent();
    };
    Level.prototype = Object.create(GameObject.prototype);

    Level.prototype.load = function(x, y, url) {
        var cell = this.grid.get(x, y);
        if (cell === undefined) {
            throw 'InvalidCellNumber';
        }
        var eventOk = new Event('level-load-ok');
        var eventFail = new Event('level-load-fail');
        cell.load(url, eventOk, eventFail);
    };
    
    return Level;
});