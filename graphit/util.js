define(function(require) {

    var graphit = require('./global');
    var documentElement = jQuery(document);
    var windowElement = jQuery(window);

    var UTIL = {
        __MODULE__ : 'graphit/util',
        injectMixin : function(cls, mixin) {
            console.log('Injecting mixin', cls, mixin);
            if ('prototype' in mixin) {
                for (key in mixin.prototype) {
                    console.log('Prototype', key);
                    cls.prototype[key] = mixin.prototype[key];
                }
            } else {
                for (key in mixin) {
                    console.log('Key', key);
                    var fn = mixin[key];
                    console.log('Fn', typeof fn);
                    if (this.isFunction(fn)) {
                        console.log(' - Adding method', key);
                        console.log(' - Prototype', cls.prototype);
                        
                        cls.prototype[key] = fn;
                    } else {
                        cls[key] = fn;
                    }
                }
            }
        },
        setParameters : function(that, options, validators) {
            this.checkParameters(options, validators);
            for (key in options) {
                console.log('Key/Value', key, options[key]);
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
        isNullOrUndef : function(value) {
            if (value === undefined || value == null) { return true; }
            return false;
        },
        getGlobal : function() {
            return window.graphit;
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
        genId : function() {
            graphit.genid += 1;
            return graphit.genid;
        },
        getDocumentById : function(id) {
            return document.getElementById(id);
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
        getWindowSize : function() {
            return [windowElement.width(), windowElement.height()];
        },
        getDocumentSize : function() {
            return [documentElement.width(), documentElement.height()];
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
        }
    };
    return UTIL;
});