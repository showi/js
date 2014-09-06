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

    var Canvas = require('../draw/canvas');

    function DBUFFER(options) {
        this.front = new Canvas(options);
        this.back = new Canvas(options);
    }

    DBUFFER.__namespace__ = 'graphit/draw/doublebuffer';

    DBUFFER.prototype.getElement = function() {
        return this.front.getElement();
    };

    DBUFFER.prototype.getCtx = function(which) {
        return this.front.getCtx();
    };

    DBUFFER.prototype.clearBackBuffer = function(color) {
        this.back.clear(color);
        return this;
    };

    DBUFFER.prototype.flip = function() {
        this.front.copyData(this.back);
        return this;
    };

    DBUFFER.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    DBUFFER.prototype.width = function(value) {
        if (value !== undefined) {
            this.front.width(value);
            this.back.width(value);
            return this;
        }
        return this.front.width();
    };

    DBUFFER.prototype.height = function(value) {
        if (value !== undefined) {
            this.front.height(value);
            this.back.height(value);
            return this;
        }
        return this.front.height();
    };

    return DBUFFER;
});
