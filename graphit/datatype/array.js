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

    var ns = require('graphit/namespace');
    ns = ns.dt;
    var _ns_ = 'array';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    function GARRAY() {
        Array.call(this, arguments);
    }

    GARRAY.prototype.empty = function() {
        while (0 < this.length) {
            this.pop();
        }
    };

    GARRAY.prototype = Object.create(Array.prototype);

    ns[_ns_] = GARRAY;
    return ns[_ns_];
});
