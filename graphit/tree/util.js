define(function(require) {

    var eCap = require('graphit/enum/capability');

    var UTIL = {
        setCapability : function(obj, capability) {
            obj.capability |= capability;
        },
        unsetCapability : function(obj, capability) {
            obj.capability &= (obj.capability & ~capability);
        },
        hasCapability : function(obj, capability) {
            if ((obj.capability & capability) == capability) { return true; }
            return false;
        },
    };
    return UTIL;
});
