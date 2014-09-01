define(function(require) {
    var util = require('graphit/util');
    var kinds_visual = ['wall', 'clock', 'randart'];
    kinds = ['randart', 'math'];
    for(var i = 0; i < kinds.length; i++) {
        util.runTest(kinds[i]);
    }
});