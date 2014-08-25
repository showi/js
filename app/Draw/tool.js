define(function(requiere) {
    var graphit = window.graphit;

    var MODULE = {
        __MODULE__: 'Draw/tool',
        randInt : function(max) {
            return Math.floor((Math.random() * max) + 1);
        },
        randomColor : function() {
            return 'rgb(' + this.randInt(255) + ',' + this.randInt(255) + ','
                    + this.randInt(255) + ')';
        },
        strokeAndFill: function() {
            var ctx = graphit.context.ctx;
            if (ctx.fillStyle) {
                ctx.fill();
            }
            if (ctx.strokeStyle) {
                ctx.stroke();
            }
        }
    };
    return MODULE;
});