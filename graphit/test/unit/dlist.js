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
        var next = item.next;
        if (item == null || item === undefined) {
            throw 'InvalidItem';
        }
        if (item.prev == null && item.next == null) {
            if (item != this.first || item != this.last) {
                throw 'InvalidItem';
            }
            this.first = this.last = null;
            next = this.first;
        } else if (item.prev == null) {
            this.first = item.next;
            this.first.prev = null;
            next = this.first;
        } else if (item.next == null) {
            this.last = item.prev;
            this.last.next = null;
            next = this.last;
        } else {
            var prev = item.prev;
            prev.next = item.next;
            prev.next.prev = prev;
            next = item.next;
        }
        item.next = null;
        item.last = null;
        this.length--;
        return next;
    };

    DLIST.prototype.pop = function() {
        return this.remove(this.last);
    };

    DLIST.prototype.shift = function() {
        return this.remove(this.first);
    };

    DLIST.prototype.empty = function() {
        // if (this.last != null) {
        // this.last.next = null;
        // this.last = null;
        // }
        // if (this.first != null) {
        // this.first.next = null;
        // this.first = null;
        // }
        // this.first = this.last = null;
        // this.length = 0;
        var elm = null;
        while (elm = this.pop());
    }

    return DLIST;
});
