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

    function Gevent() {
        this.element = document.createElement('div');
    }
    
    Gevent.prototype.addListener = function(name, fn) {
        return this.element.addEventListener(name, fn, false);
    };
    Gevent.prototype.removeListener = function(name, fn) {
        return this.element.removeEventListener(name, fn, false);
    };
    Gevent.prototype.dispatch = function(event) {
        this.element.dispatchEvent(event);
    };

    return Gevent;
});