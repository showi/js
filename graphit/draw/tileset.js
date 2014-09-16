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
    var ns = namespace.draw;
    var eType = require('graphit/enum/type');
    var Image = require('graphit/draw/image');

    function TILESET(parent, name, url, fnOk, fnFail) {
        if (parent === undefined) { throw 'NoParent'; }
        if (name === undefined) { throw 'NoName'; }
        var that = this;
        this.name = name;
        this.type = eType.tileset;
        this.parent = parent;
        this.isLoaded = false;
        this.error = undefined;
        this.uid = namespace.genUID();
        this.url = url;
        function loadOk(data) {
            console.log('Tileset loaded', this.toString());
            that.isLoaded = true;
            fnOk.call(that, data);
        }
        function loadFail(data) {
            console.log('Failed to load', this.toString());
            this.isLoaded = false;
            fFail.call(that, data);
        }
        this.parent.loadImage(name, url, loadOk, loadFail);
    };
    TILESET.__namespace__ = 'graphit/draw/tileset';

    TILESET.prototype.toString = function() {
        var s = '<tileset';
        for (var name in this) {
            if (!this.hasOwnKeyProperty(name)) {
                console.log('skipping key', name);
                continue;
            }
            s += name + '="'+this[name]+'"';
        }
        return s;
    };

    return TILESET;
});
