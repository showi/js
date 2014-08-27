define(function(require) {
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
                    console.error('Invalid Field:', name);
                    throw 'InvalidField';
                }
            }
            for (name in validators) {
                if (!(name in options)) {
                    console.error('Missing parameter: ', name);
                    throw 'MissingParameter';
                }
                var value = options[name];
                if (this.isNullOrUndef(value)) {
                    if ('required' in validators[name]) {
                        if (!('default' in validators[name])) {
                            console.error('Missing Parameter:', name);
                            throw 'MissingParameter';
                        }
                    }

                }
            }
        }
    };
});