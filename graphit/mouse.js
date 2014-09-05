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
    var math = require('graphit/math');

    function MOUSE() {
        this.trackedElement = {
            tracking : true,
            element : null,
            onmousemove : null,
            record : [],
            maxRecord : 10
        };
    }

    MOUSE.prototype.registerMouseClick = function(elm, fn) {
        var that = this;
        elm.addEventListener('click', function(e) {
            fn.call(that, e);
            return false;
        });
        return this;
    };

    MOUSE.prototype.registerMouseMove = function(elm) {
        var that = this;
        this.trackedElement.element = elm;
        this.trackedElement.onmousemove = elm.onmousemove;
        elm.mouseTracker = {
            x : 0,
            y : 0
        };
        elm.addEventListener('mousemove', function(event) {
            var x = math.clamp(event.x - elm.offsetLeft + window.scrollX, 0,
                               this.width);
            var y = math.clamp(event.y - elm.offsetTop + window.scrollY, 0,
                               this.height);
            this.mouseTracker.x = x;
            this.mouseTracker.y = y;
            if (that.trackedElement.tracking) {
                that.recordXY(x, y);
            }
        }, true);
        return this;
    };

    MOUSE.prototype.recordXY = function(x, y) {
        var elm = this.trackedElement.element.mouseTracker;
        if (this.trackedElement.record.length > 50) {
            this.trackedElement.record.shift();
        }
        this.trackedElement.record.push({
            time : Date.now(),
            pos : new Vector2d(x, y)
        });
        return this;
    };

    MOUSE.prototype.iterRecord = function(fn, limit, reverse) {
        if (!reverse) {
            throw 'NotImplemented'
        }
        var len = this.trackedElement.record.length - 1;
        var ml = len - limit;
        ml = (ml < 0)? 0: ml;
        for (var i = len; i >= ml; i--) {
            fn.call(this, this.trackedElement.record[i]);
        }
    };

    MOUSE.prototype.unregisterMouseMove = function() {
        if (this.trackedElement == null) { return; }
        var elm = this.trackedElement.element;
        elm.onmousemove = this.trackedElement.onmousemove;
        delete elm.mouseTracker;
        this.trackedElement = {
            element : null,
            onmousemove : null
        };
        return this;
    };

    MOUSE.prototype.width = function(value) {
        if (value === undefined) { return this.trackedElement.element.width; }
        this.trackedElement.element.width = value;
        return this;
    };

    MOUSE.prototype.height = function(value) {
        if (value === undefined) { return this.trackedElement.element.height; }
        this.trackedElement.element.height = value;
        return this;
    };

    MOUSE.prototype.getY = function() {
        return this.trackedElement.element.mouseTracker.y;
    };

    MOUSE.prototype.getX = function() {
        return this.trackedElement.element.mouseTracker.x;
    };

    MOUSE.prototype.toString = function() {
        return '<mouse x=' + this.x + ', y=' + this.y + '>';
    };

    MOUSE.prototype.trackStart = function() {
        this.trackedElement.tracking = true;
        return this;
    };

    MOUSE.prototype.trackStop = function() {
        this.trackedElement.tracking = false;
        return this;
    };

    return MOUSE;
});
