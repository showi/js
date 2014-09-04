define(function(require) {
    
    'use strict';

    var ns = require('graphit/namespace');
    var Enum = require('graphit/enum');
    ns = ns.enum;
    var _ns_ = 'shape';
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_];}

    var SHAPE = new Enum({
        'rectangle': 'rectangle',
        'line': 'line',
        'circle': 'circle',
    });
   
    ns[_ns_] = SHAPE;
    return ns[_ns_];
});
