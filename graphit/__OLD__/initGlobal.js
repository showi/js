define(function(require) {
    var CCanvas = require('./draw/canvas');
    var canvas = new CCanvas(1, 1);
    
    window.graphit.gContext = canvas.getContext();
    return window.graphit;
});