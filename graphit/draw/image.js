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
    var _ns_ = eType.reverse(eType.image);
    
    if (_ns_ in ns && ns[_ns_] != undefined) {
        return ns[_ns_];
    }
        
    function IMAGE(parent, name, src, fnOk, fnFail, linkUid) {
        console.log('new Image', parent, name, src);
        if (fnOk === undefined) fnOk = function() {};
        if (fnFail === undefined) fnFail = function() {};
        this.__namespace__ = 'graphit/draw/Image';
        var that = this;
        this.name = name;
        this.type = eType.image;
        this.parent = parent;
        this.linkUid = linkUid;
        this.isLoaded = false;
        this.error = undefined;
        this.uid = namespace.genUID();
        this.element = document.createElement('img');
        this.element.onload = (function(element) {
            return function(e) {
                element.isLoaded = true;
                element.error = undefined;
                parent.addAsset(element);
                this.image = element;
                fnOk.call(that, element);
            };
        }(this));
        this.element.onerror = (function(element) {
            return function(e) {
                element.isLoaded = false;
                element.error = 'Cannot load image: ' + element.src;
                parent.addAsset(element);
                fnFail.call(that, element);
            };
        }(this));
        this.element.src = encodeURI(src);
    };

    IMAGE.prototype.drawTile = function(ctx, x, y, tileWidth, tileHeight) {
        ctx.drawImage(this.element,
                      x * tileWidth,
                      y * tileHeight,
                      tileWidth,
                      tileHeight,
                      0, 0, 
                      tileWidth, tileHeight);
    };

    ns[_ns_] = IMAGE;
    return ns[_ns_];
});