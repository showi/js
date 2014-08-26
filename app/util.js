define(function(require) {

    var graphit = require('./global');
    var documentElement = jQuery(document);
    var windowElement = jQuery(window);

    var UTIL = {
        __MODULE__ : 'util',
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
    };
    return UTIL;
});