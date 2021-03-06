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

    require('graphit/scene/node/element');
    require('graphit/scene/node/primitive');

    var FACTORY = {
        node : function(cls, opts, args) {
            var node = new cls(args);
            if (opts !== undefined) {
                if (opts.pool !== undefined) {
                    opts.pool.push(node);
                }
            }
            return node;
        },
    };
    return FACTORY;
});
