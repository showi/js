define(function(require) {
    var util = require('graphit/util');
    var kinds_visual = ['clock', 'randart', 'movingpaint'];
    var kinds = ['transform'];
    for(var i = 0; i < kinds.length; i++) {
        util.runTest(kinds[i]);
    }
});