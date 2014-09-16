/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
*/
define(function(require) {

    'use strict';

    var log = require('graphit/log');
    var util = require('graphit/util');

    return function() {
        this.setArguments = function(options, validators) {
            if (options === undefined) { return; }
            if (options.lengtht < 2) { return; }
            var opts = options[0];
            if (opts === undefined) { return; }
            opts = this.checkArguments(opts, validators);
            for (var key in opts) {
                this[key] = opts[key];
            }
        };
        this.checkArguments = function(options, validators) {
            console.log('Checking options', options, validators);
            var opts = {};
            for (name in options) {
                if (!options.hasOwnProperty(name)){
                    continue;
                }
                if (!(name in validators)) {
                    //log.error('Invalid Field', name, this);
                    continue; //throw new InvalidParameterException(name);
                }
                opts[name] = options[name];
            }
            for (name in validators) {
                var validator = validators[name];
                var value = undefined;
                if (!(name in opts)) {
                    if (validator.required) {
                        if (!('defaultValue' in validator)) {
                            log
                                    .error(this.__MODULE__
                                            + ' / Missing parameter', name);
                            throw new MissingParameterException(name);
                        } else {
                            value = validator.defaultValue;
                        }
                    }
                } else {
                    value = options[name];
                }
                opts[name] = value;
            }
            return opts;
        };
    };
});
