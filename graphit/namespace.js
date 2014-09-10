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

    /* Creating global namespace */
    var _ns_ = 'graphit';
    /* Testing existence of namespace */
    if (_ns_ in window) { /* Already defined */
        console.log('>>> Global namespace already defined');
        return window[_ns_];
    }
    /* Extending javascript object */
    require('graphit/extend/string');
//    require('graphit/extend/math');

    /* injecting our base data */
    var NAMESPACE = {
        __version__ : '0.0.1',
        __namespace__ : _ns_,
        tool : null,
        shape : null,
        draw: {},
        enum : {},
        geom: {},
        dt: {},
        __uid__: 0,
        genUID : function() {
            return this.__uid__++;
        },
        scene : {
            node : [],
 
        },
        test : {},
        toString: function() {
            return '<' + this.__namespace__ + 
                ' version="' + this.__version__ + '">';
        }
    };

    window[_ns_] = NAMESPACE;
    console.log(NAMESPACE.toString());
    return window[_ns_];
});
