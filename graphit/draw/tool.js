define(function(requiere) {
    var graphit = window.graphit;

    var TOOL = {
        __MODULE__ : 'graphit/draw/tool',
        randInt : function(max) {
            return Math.floor((Math.random() * max) + 1);
        },
        randomColor : function() {
            return 'rgb(' + this.randInt(255) + ',' + this.randInt(255) + ','
                    + this.randInt(255) + ')';
        },
        strokeAndFill : function(ctx) {
            if (ctx.fillStyle) {
                ctx.fill();
            }
            if (ctx.strokeStyle) {
                ctx.stroke();
            }
        },
        incRotation : function(angle, step) {
            angle += step;
            if (angle >= 360) {
                c = Math.round(angle / 360);
                angle = angle - (c * 360);
            }
            return Math.round(angle * 10) / 10;
        },
        saveAndRestore : function(ctx, callback) {
            ctx.save();
            callback(ctx);
            ctx.restore();
        }
    };
    return TOOL;
});