define(function(require) {

    var util = require('../util');
    var tool = require('../Draw/tool');

    var NAMESPACE = {
        __MODULE__ : 'Draw/Shape',
        line : function(sx, sy, ex, ey) {
            var ctx = util.getContext();
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            tool.strokeAndFill();
            ctx.closePath();
        },
        rectangle : function(lx, ly, rx, ry) {
            var ctx = util.getContext();
            ctx.beginPath();
            ctx.rect(lx, ly, rx, ry);
            tool.strokeAndFill();
            ctx.closePath();
        }
    };
    return NAMESPACE;
});