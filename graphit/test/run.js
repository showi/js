define(function(require) {
    var log = require('graphit/log');
    var tests = {
        clock: require('./clock'),
        playground: require('./playground')
    };
    var execute = ['playground'];
    for (var i = 0; i < execute.length; i++) {
        var key = execute[i];
        if (key in tests) {
            var test = tests[key];
            console.log(test);
            log.title(test.__MODULE__);
            test.run();
        }
    }
});