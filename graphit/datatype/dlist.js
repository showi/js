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

    var elementFactory = require('graphit/datatype/dlist/elementFactory');

    function DLIST(parameters) {
        this.first = null;
        this.last = null;
        this.length = 0;
    };

    DLIST.prototype.foreach = function(callback, reverse) {
        if (reverse === undefined) {
            var current = this.first;
            while (current != null) {
                callback(current);
                current = current.next;
            }
        } else {
            var current = this.last;
            while (current != null) {
                callback(current);
                current = current.prev;
            }
        }
    };

    DLIST.prototype.insert = function(content) {
        var elm = elementFactory(content, null, this.first);
        if (this.first === null) {
            this.first = elm;
            this.last = elm;
        } else {
            this.first.prev = elm;
            this.first = elm;
        }
        this.length += 1;
        return elm;
    };

    DLIST.prototype.append = function(content) {
        if (this.first === null) { return this.insert(content); }
        var elm = elementFactory(content, this.last, null);
        this.last.next = elm;
        this.last = elm;
        this.length += 1;
        return elm;
    };
    
    DLIST.prototype.push = function(content) {
        return this.append(content);
    };

    DLIST.prototype.isEmpty = function() {
        if (this.next === this.prev === null) { return true; }
        return false;
    };

    DLIST.prototype.remove = function(item) {
        if (item === null) { return null; }
        if (item == this.first && item == this.last) {
            this.first = this.last = null;
            this.length = 0;
        } else if (item == this.first) {
            item.next.prev = null;
            this.first = item.next;
            this.length -= 1;
        } else if (item == this.last) {
            item.prev.next = null;
            this.last = item.prev;
            this.length -= 1;
        }
        return item;
    };

    DLIST.prototype.pop = function() {
        return this.remove(this.last);
    };
    
    DLIST.prototype.shift = function() {
        return this.remove(this.first);
    }

    return DLIST;
});
