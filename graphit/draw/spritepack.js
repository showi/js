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
    var eType = require('graphit/enum/type');
    var Image = require('graphit/draw/image');

    function SPRITEPACK(parent, name, src, fnOk, fnFail) {
        if (fnOk === undefined) fnOk = function() {
        };
        if (fnFail === undefined) fnFail = function() {
        };
        this.__namespace__ = 'graphit/draw/spritepack';
        var that = this;
        this.name = name;
        this.type = eType.spritepack;
        this.parent = parent;
        this.isLoaded = false;
        this.error = undefined;
        this.uid = namespace.genUID();

        jQuery.getJSON(src, function(data) {
            that.isLoaded = true;
            that.error = undefined;
            parent.addAsset(that);
            that.loadJSON(data);
            fnOk.call(that, data);
        });
    };

    SPRITEPACK.prototype.loadJSON = function(data) {
        this.json = data;
        if (!('animationPack' in data)) {
            throw 'NoAnimationPack'; 
        }
        data = data['animationPack'];
        if (!(this.name in data)) {
            throw 'NoRequiredName';
        }
        data = data[this.name];
        var pool;
        for(var action in data) {
            for (var direction in data[action]) {
                console.log('pool', pool);
                pool = data[action][direction];
                for (var i = 0; i < pool.length; i++) {
                    var d = data[action][direction][i];
                    var name = [this.name, action, direction, i].join('-');
                    graphit.assetManager.loadImage(name, d.path, this.uid);
                }
            }
        }
        
    }
    ns[_ns_] = SPRITEPACK;
    return ns[_ns_];
});
