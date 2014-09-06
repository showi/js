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
    require('graphit/extend/math');

    /* injecting our base data */
    window[_ns_] = {
        __version__ : '0.0.1',
        __namespace__ : _ns_,
        tool : null,
        shape : null,
        draw: {},
        enum : {},
        genUID : function() {
            return this.__UID__++;
        },
        tree : {
            node : [],
        },
        test : {}
    };
//    for(var key in window[_ns_]) {
//        if (!window[_ns_].hasOwnProperty(key)) {
//            continue;
//        }
//        Object.defineProperty(window[_ns_], key, {
//            writable : false,
//            enumerable : true,
//            configurable : true
//        });
//    }
//    Object.defineProperty(window[_ns_], '__UID__', {
//        value: 0,
//        writable: true,
//        enumerable: true,
//        configurable : false
//    });
//    Object.defineProperty(window, _ns_, {
//        writable: false,
//        enumerable: true,
//        configurable: false,
//    });
    console.log('>>> Namespace', _ns_, window[_ns_]);
    return window[_ns_];
});
