define(function(require) {

    var util = require('../util');
    var tool = require('../Draw/tool');

    var SHAPE = {
        __MODULE__ : 'Draw/Shape',
        line : function(ctx, sx, sy, ex, ey) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        },
        rectangle : function(ctx, lx, ly, rx, ry) {
            ctx.beginPath();
            ctx.rect(lx, ly, rx, ry);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        },
        circle: function(ctx, centerX, centerY, radius) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            tool.strokeAndFill(ctx);
            ctx.closePath();
        }
    };
    return SHAPE;
});