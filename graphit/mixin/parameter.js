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
                var validator = validators[name];
                var value = undefined;
                if (!(name in options)) {
                    if (validator.required) {
                        if (!('defaultValue' in validator)) {
                            log.error(
                                    this.__MODULE__ + ' / Missing parameter',
                                    name);
                            throw new MissingParameterException(name);
                        } else {
                            value = validator.defaultValue;
                        }
                    }
                } else {
                    value = options[name];
                }
            }
        }
    };
});