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

    function ENUM(data) {
        Object.defineProperty(this, '_keys', {
            value: [],
            writable : false,
            enumerable : true,
            configurable : true
        });
        Object.defineProperty(this, '_values', {
            value: {},
            writable : false,
            enumerable : true,
            configurable : true
        });
        for ( var key in data) {
            this.add(key, data[key]);
        }
        this._lock();
    }
    ENUM.__namespace__ = 'graphit/enum';

    ENUM.prototype._lock = function() {
        Object.defineProperty(this, '_keys', {
            writable : false,
            enumerable : false,
            configurable : true
        });
        Object.defineProperty(this, '_values', {
            writable : false,
            enumerable : false,
            configurable : true
        });
    };

    ENUM.prototype._unlock = function() {
        Object.defineProperty(this, '_keys', {
            writable : true,
            enumerable : false,
            configurable : true
        });
        Object.defineProperty(this, '_values', {
            writable : true,
            enumerable : false,
            configurable : true
        });
    };

    ENUM.prototype._add_key = function(key, value) {
        this._keys.push(key);
        this._values[value] = key;
    };

    ENUM.prototype.add = function(key, value) {
        if (key in this) { throw 'TryToAddSameKey'; }
        this._unlock();
        this._add_key(key, value);
        Object.defineProperty(this, key, {
            value : value,
            writable : false,
            enumerable : true,
            configurable : false
        });
        this._lock();
    };

    ENUM.prototype.get = function(key) {
        if (!(key in this || this[key] === undefined)) {
            throw 'Invalid enum key:' + key;
        }
        return this[key];
    };

    ENUM.prototype.reverse = function(value) {
        if (!(value in this._values)) {
            throw 'Invalid enum value ' + value;
        }
        return this._values[value];
    };

    return ENUM;
});
