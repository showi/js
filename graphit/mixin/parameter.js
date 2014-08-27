define(function(require) {
    var log = require('graphit/log');
    var util = require('graphit/util');

    var InvalidParameterException = require('graphit/exception/InvalidParameter');
    var MissingParameterException = require('graphit/exception/MissingParameter');
    
    return {
        setParameters : function(options, validators) {
            if (validators !== undefined) {
                this.checkParameters(options, validators);
            }
            for (key in options) {
                console.log('Key/Value', key, options[key]);
                this[key] = options[key];
            }
        },
        checkParameters : function(options, validators) {
            for (name in options) {
                if (!(name in validators)) {
                    log.error(this.__MODULE__ + ' / Invalid Field:', name);
                    throw new InvalidParameterException(name);
                }
            }
            for (name in validators) {
                if (!(name in options)) {
                    log.error(this.__MODULE__ + ' / Missing parameter', name);
                    throw new MissingParameterException(name);
                }
                var value = options[name];
                if (util.isNullOrUndef(value)) {
                    if ('required' in validators[name]) {
                        if (!('default' in validators[name])) {
                            log.error('Missing Parameter:', name);
                            throw new MissingParameterException(name);
                        }
                    }

                }
            }
        }
    };
});