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

    var Node = require('./node');
    var ns = require('graphit/namespace');
    ns = ns.tree.node;
    var _ns_ = 'element';
    
    if (_ns_ in ns && ns !== undefined) {
        return ns[_ns_];
    }

    function ELEMENT() {
        Node.call(this, arguments);
        this.__namespace__ = 'graphit/tree/node/element';
    };
    ELEMENT.prototype = Object.create(Node.prototype);

    ns[_ns_] = ELEMENT;
    return ns[_ns_];
});