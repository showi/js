define(function(require) {
    var util = require('graphit/extend/util');

    if (typeof String.prototype.startsWith != 'function') {
        util.log('String', 'startsWith');
        String.prototype.startsWith = function(str) {
            return this.slice(0, str.length) == str;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        util.log('String', 'endsWith');
        String.prototype.endsWith = function(str) {
            return this.slice(-str.length) == str;
        };
    }

});
