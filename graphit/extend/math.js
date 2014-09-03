define(function(require) {
    var util = require('graphit/extend/util');

    if (typeof Math.randInt != 'function') {
        util.log('Math', 'randInt');
        Math.randInt = function(a, b) {
            return Math.floor((Math.random() * b) + a);
        };
    }
    if (typeof Math.randFloat != 'function') {
        util.log('Math', 'randFloat');
        Math.randFloat = function(a, b) {
            return Math.random() * b + a;
        };
    }
});
