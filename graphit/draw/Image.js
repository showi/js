define(function(require) {

    var Context = require('../draw/Context');

    function IMAGE(options) {
        this.__MODULE__ = 'graphit/draw/Image';
        this.element = null;
        this.context = null;
        this._newContext(options.width, options.height, options.id);
    };
    return IMAGE;
});