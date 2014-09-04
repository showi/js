define(function(require) {
    var log = require('graphit/log');
    var util = require('./util');
    var tool = require('./draw/tool');
    var shape = require('./draw/shape');
    var InvalidNamespaceException = require('./exception/InvalidNamespace');

    var Canvas = require('./draw/canvas');
    var Context = require('./draw/context');
    var DoubleBuffer = require('./draw/doublebuffer');
    var Layer = require('./draw/layer');
    
    window.graphit.loadClass = function(name) {
        if (!(name in _registered_class)) {
            throw new InvalidNamespaceException(name);
        }
        if (util.isNullOrUndef(_registered_class[name])) {
            _registered_class[name] = require(name);
        }
        return _registered_class[name];
    };

    window.graphit.listClass = function() {
        return _registerd_class;
    };

    if (window.graphit.log === undefined) {
        window.graphit.log = log;
        window.graphit.util = util;
        window.graphit.tool = tool;
        window.graphit.shape = shape;
        window.graphit.factory = {
                'Canvas': Canvas,
                'Context': Context,
                'DoubleBuffer': DoubleBuffer,
                'Layer': Layer,
        };
    }
    return window.graphit;
});