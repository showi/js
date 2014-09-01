define(function(require) {

    var util = require('graphit/util');
    
    var kinds = ['wall', 'clock', 'randart'];
    for(var i = 0; i < kinds.length; i++) {
        util.runTest(kinds[i]);
    }
});