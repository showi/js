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
    
    var _ns_ = 'image';
    
    if (_ns_ in ns && ns[_ns_] != undefined) {
        return ns[_ns_];
    }
        
    function IMAGE(parent, name, src) {
        this.__namespace__ = 'graphit/draw/Image';
        var that = this;
        this.name = name;
        this.type = 'image';
        this.parent = parent;
        this.isLoaded = false;
        this.error = false;
        this.uid = namespace.genUID();
        this.element = document.createElement('img');
        this.element.onload = (function(element) {
            return function(e) {
//                console.log('OnLoad', e, parent);
                element.isLoaded = true;
                element.error = false;
                parent.addAsset(element);
            };
        }(this));
        this.element.onerror = (function(element) {
            return function(e) {
                element.isLoaded = false;
                element.error = true;
//                console.log('OnLoad');
                parent.addAsset(element);
            };
        }(this));
        this.element.src = encodeURI(src);
    };

    ns[_ns_] = IMAGE;
    return ns[_ns_];
});