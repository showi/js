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

    function MouseProperty() {
        this.x = 0;
        this.y = 0;
        this.mouseDown = false;
        this.onMouseMove = undefined;
        this.recording = false;
        this.element = null;
        this.onmousemove = null;
        this.record = [];
        this.maxRecord = 33;
    };

    function MOUSE() {
        this.trackedElement = {
            element : null,
            onmousemove : null,
        };
    };

    MOUSE.prototype.registerMouseUpDown = function(elm, up, down, update) {
        var that = this;
        elm.mouseTracker.onMouseDown = update;
        elm.addEventListener('mouseup', function(e) {
            console.log('MouseUP');
            up.call(elm, e);
            elm.mouseTracker.mouseDown = false;
            return false;
        });
        elm.addEventListener('mousedown', function(e) {
            console.log('MouseDown');
            this.mouseTracker.mouseDown = true;
            down.call(elm, e);
            return false;
        });

        return this;
    };

    MOUSE.prototype.registerMouseMove = function(elm) {
        var that = this;
        this.trackedElement.element = elm;
        this.trackedElement.onmousemove = elm.onmousemove;
        if (elm.mouseTracker === undefined) {
            elm.mouseTracker = new MouseProperty();
        }
        elm.addEventListener('mousemove', function(event) {
            var x = math.clamp(event.x - elm.offsetLeft + window.scrollX, 0,
                               this.width);
            var y = math.clamp(event.y - elm.offsetTop + window.scrollY, 0,
                               this.height);
            this.mouseTracker.x = x;
            this.mouseTracker.y = y;
            if (this.mouseTracker.recording) {
                that.recordXY(this, x, y);
            }
            if (this.mouseTracker.recording) {
                if (this.mouseTracker.onMouseDown !== undefined) {
                    if (typeof this.mouseTracker.onMouseDown == 'function') {
                        this.mouseTracker.onMouseDown.call(this, event);
                    }
                }
            }
        }, true);
        return this;
    };

    MOUSE.prototype.recordXY = function(elm, x, y) {
        if (elm.mouseTracker.record.length > elm.mouseTracker.maxRecord) {
            elm.mouseTracker.record.shift();
        }
        elm.mouseTracker.record.push({
            time : Date.now(),
            pos : new Vector2d(x, y)
        });
        return this;
    };

    MOUSE.prototype.iterRecord = function(fn, limit, reverse) {
        if (!reverse) { throw 'NotImplemented'; }
        var len = this.mouseTracker.record.length - 1;
        var ml = len - limit;
        ml = (ml < 0) ? 0 : ml;
        for (var i = len; i >= ml; i--) {
            fn.call(this.mouseTracker, this.mouseTracker.record.shift());
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

    MOUSE.prototype.recordStart = function() {
        this.trackedElement.element.mouseTracker.recording = true;
        return this;
    };

    MOUSE.prototype.recordEnd = function() {
        this.trackedElement.element.mouseTracker.recording = false;
        return this;
    };

    return MOUSE;
});
