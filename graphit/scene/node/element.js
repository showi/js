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

    var Node = require('graphit/scene/node/node');
    var ns = require('graphit/namespace');
    ns = ns.scene.node;
    var _ns_ = 'element';

    if (_ns_ in ns && ns !== undefined) { return ns[_ns_]; }

    function ELEMENT() {
        Node.call(this, arguments);
    };
    ELEMENT.prototype = Object.create(Node.prototype);
    ELEMENT.__namespace__ = 'graphit/scene/node/element';
    
    ns[_ns_] = ELEMENT;
    return ns[_ns_];
});
