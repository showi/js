define(function(require) {
    var util = require('graphit/test/util');
    var kinds_visual = ['clock', 'randart', 'movingpaint'];
    var kinds = ['select'];
    for(var i = 0; i < kinds.length; i++) {
        util.runTest(kinds[i]);
    }
});