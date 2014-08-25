define(function(require) {
    var graphit = require('./global');
    var NAMESPACE = {
        getContext : function() {
            return graphit.context;
        },
        setContext : function(newContext) {
            var context = this.getContext();
            if (context != null && context == newContext) {
                console.info('Same context');
                return this;
            }
            window.graphit.context = newContext;
            return this;
        },
        isArray : function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
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
        }
    };
    return NAMESPACE;
});