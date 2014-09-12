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
    ns = ns.math;
    var _ns_ = 'factory';
    var Rect= require('graphit/math/rect');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');
    
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var RectFactory = new Rect(0,0,1,1);
    RectFactory.Delete();

    var Vector2dFactory = new Vector2d();
    Vector2dFactory.Delete();

    var Matrix33Factory = new Matrix33();
    Matrix33Factory.Delete();
    
    var NAMESPACE = {
        vector2d : Vector2dFactory,
        rect : RectFactory,
        matrix33: Matrix33Factory,
    };

    ns[_ns_] = NAMESPACE;
    return ns[_ns_];
});
