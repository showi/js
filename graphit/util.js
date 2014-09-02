define(function(require) {

    var graphit = require('./namespace');
    var Vector2d = require('graphit/math/vector2d');
    var documentElement = jQuery(document);
    var windowElement = jQuery(window);

    var UTIL = {
        __MODULE__ : 'graphit/util',
        genuid : function() {
            if (graphit.__GENUID__ === undefined) {
                graphit.__GENUID__ = 0;
            }
            return graphit.__GENUID__++;
        },
        injectMixin : function(cls, mixin) {
            if ('prototype' in mixin) {
                for (key in mixin.prototype) {
                    if (key in cls.prototype) {
                        console.warn('Method already set', key, "exit..");
                        return false;
                    }
                    cls.prototype[key] = mixin.prototype[key];
                }
            } else {
                for (key in mixin) {
                    var fn = mixin[key];
                    if (this.isFunction(fn)) {
                        cls.prototype[key] = fn;
                    } else {
                        cls[key] = fn;
                    }
                }
            }
            return true;
        },
        windowSize : function() {
            return new Vector2d(windowElement.width(), windowElement.height());
        },
        documentSize : function() {
            return new Vector2d(documentElement.width(), documentElement
                    .height());
        },
        setParameters : function(that, options, validators) {
            this.checkParameters(options, validators);
            for (key in options) {
                that[key] = options[key];
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
        },
        join : function(a, separator) {
            var s = '';
            for (var i = 0; i < a.length; i++) {
                s += a[i] + separator;
            }
            return s;
        },
        isNullOrUndef : function(value) {
            if (value === undefined || value == null) { return true; }
            return false;
        },
        getGlobal : function() {
            return window.graphit;
        },
        choice : function(choices) {
            return choices[Math.randInt(0, choices.length)];
        },
        isArray : function(value) {
            return Object.prototype.toString.call(value) === Object.prototype.toString
                    .call([]);
        },
        isString : function(value) {
            return (typeof value) === "string";
        },
        isBoolean : function(value) {
            return (typeof value) === "boolean";
        },
        isNumber : function(value) {
            return (typeof value) === "number";
        },
        ucFirst : function(value) {
            if (value.length < 1) { return value; }
            var fl = value.slice(0, 1).toUpperCase();
            return fl + value.slice(1);
        },
        isFunction : function(value) {
            return (typeof value) === 'function';
        },
        getMin : function(values) {
            if (!this.isArray(values)) {
                values = [values];
            }
            var min = values[0];
            for (var i = 1; i < values.length; i++) {
                if (values[i] < min) {
                    min = values[i];
                }
            }
            return min;
        },

        centerElement : function(elm) {
            elm.css("position", "absolute");
            elm.css("top", Math.max(0, ((windowElement.height() - elm
                    .outerHeight()) / 2)
                    + windowElement.scrollTop())
                    + "px");
            elm.css("left", Math.max(0, ((windowElement.width() - elm
                    .outerWidth()) / 2)
                    + windowElement.scrollLeft())
                    + "px");
        },
        catchException : function(obj, meth) {
            try {
                return obj[meth].call(obj);
            } catch (e) {
                console.error('Exception', e);
                console.error(e.stack);
            }
            return false;
        },
        runTest : function(name) {
            var that = this;
            require(['graphit/test/' + name], function(test) {
                console.log('>>>>> Running test', name, '(',
                            test.__namespace__, ')');
                if (name in graphit.test) { throw 'TestAlreadyRunning'; }
                graphit.test[name] = test;
                for (key in test) {
                    if (key.startsWith('test_') && !test.hasOwnProperty(key)) {
                        console.log('>>>', key);
                        that.catchException(test, key);
                    }
                }
                if ('run' in test) {
                    if (!test.hasOwnProperty('run')) {
                        console.log('>>> run');
                        that.catchException(test, 'run');
                    }
                }
            });
        }
    };
    return UTIL;
});
