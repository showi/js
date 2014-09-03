define(function(require) {
    var ns = require('graphit/namespace');
    ns = ns.enum;
    var _ns_ = 'matrix33';

    if (_ns_ in ns && ns[_ns_] !== undefined) { return ns[_ns_]; }

    var ENUM = {
        m11 : 0,
        m12 : 1,
        m13 : 2,
        m21 : 3,
        m22 : 4,
        m23 : 5,
        m31 : 6,
        m32 : 7,
        m33 : 8,
    };

    ns[_ns_] = ENUM;
    return ns[_ns_];
});
