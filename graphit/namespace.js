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
        __VERSION__ : '0.0.1',
        __NAMESPACE__ : _ns_,
        __UID__ : 0,
        tool : null,
        util : null,
        shape : null,
        math : {},
        enum : {},
        genuid : function() {
            return this.__UID__++;
        },
        tree : {
            node : [],
        },
        test : {}
    };
    console.log('>>> Namespace', _ns_, window[_ns_]);
    return window[_ns_];
});
