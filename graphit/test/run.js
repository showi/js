define(function(require) {
    var util = require('graphit/util');
    var kinds_visual = ['wall', 'clock', 'randart'];
    kinds = ['tree'];
    for(var i = 0; i < kinds.length; i++) {
        util.runTest(kinds[i]);
    }
});