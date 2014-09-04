define(function(require) {
    var log = require('graphit/log');
    var util = require('graphit/util');

    var InvalidParameterException = require('graphit/exception/InvalidParameter');
    var MissingParameterException = require('graphit/exception/MissingParameter');

    return function() {
        this.setParameters = function(options, validators) {
            if (options === undefined) {
                return;
            }
            if (options.lengtht < 1) {
                return;
            }
            options = options[0];
            if (options === undefined) {
                return;
            }
            if (validators !== undefined) {
                this.checkParameters(options, validators);
            }
            for (key in options) {
                console.log('Setting', key, options);
                this[key] = options[key];
            }
        };
        this.checkParameters = function(options, validators) {
            for (name in options) {
                if (!(name in validators)) {
                    log.error('Invalid Field', name, this);
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
                options[name] = value;
            }
        }
    };
});