define(function(require) {
    var test = require('graphit/test/util');
    var util = require('graphit/util');
    var choices = ['randart', 'clock', 'wall', 'movingpaint'];
    var choice = util.choice(choices);
    choice = 'movingpaint';
    console.log('>>> random test:', choice, '(', choices, ')');
    test.runTest(choice);
});