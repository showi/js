define(function(require) {
    
    'use strict';

    var ns = require('graphit/namespace');
    var Enum = require('graphit/enum');
    ns = ns.enum;
    var _ns_ = 'capability';
    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_];}

    var CAPABILITY = new Enum({
        transform : 1 << 1,
        rigid : 1 << 2,
        draw: 1 << 3,
    });
   
    ns[_ns_] = CAPABILITY;
    return ns[_ns_];
});