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

    var __trash__ = {};
   
    var __STOREABLE__ = {
                         created: 0,
                         recycled: 0,
                         deleted: 0,
                         real: 0,
    };

    function STOREABLE() {
        ;
    }

    STOREABLE.prototype.Create = function() {
        var obj = this.GetObjectType(this.type);
        if (obj != null) {
            obj.setUp.apply(this, arguments);
            __STOREABLE__.recycled++;
        } else {
           obj = this.New.apply(this, arguments);
           __STOREABLE__.real++;
        }
        __STOREABLE__.created++;
        return obj;
    };
    
    STOREABLE.prototype.New = function() {
        throw 'NotImplemented';
    };
    
    STOREABLE.prototype.Pop = function() {
        __store__[this.type].pop(obj);
    };

    STOREABLE.prototype.Delete = function() {
        if (__trash__[this.type] === undefined) {
            __trash__[this.type] = [];
        }
        __trash__[this.type].push(this);
        __STOREABLE__.deleted++;
    };

    STOREABLE.prototype.ClearCache = function() {
        for ( var key in __trash__) {
            __trash__[key] = [];
        }
//        for ( var key in __STOREABLE__) {
//            __STOREABLE__[key] = 0;
//        };
//        
    };

    STOREABLE.prototype.Trash = function() {
        return __trash__;
    };

    STOREABLE.prototype.GetObjectType = function(type) {
        if (__trash__[type] === undefined) {
            return null;
        }
        if (__trash__[type].length < 1) {
            return null;
        }
        return __trash__[type].pop();
    };
    STOREABLE.prototype.StoreableStats = function () {
        return __STOREABLE__;
    };
    return STOREABLE;
});
