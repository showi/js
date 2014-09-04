define(function(require) {
    
    'use strict';

    var Enum = require('graphit/enum');

    var CAPABILITY = new Enum({
        transform : 1 << 1,
        rigid : 1 << 2,
        draw: 1 << 3,
    });
   
    return CAPABILITY;
});
