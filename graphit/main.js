define(function(require) {
    var util = require('graphit/util');
    var choices = ['randart', 'clock', 'wall', 'movingpaint'];
    var choice = util.choice(choices);
    console.log('>>> random test:', choice, '(', choices, ')');
    util.runTest(choice);
    function reload() {
            window.location.reload();
    }
    setTimeout(reload, 1000*60);
});