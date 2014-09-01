define(function(require) {

    var api = require('../api');

    var Layer = require('../draw/Layer');
    var Canvas = require('graphit/draw/Canvas');

    var Mixin = {
        mixit : function(value) {
            return "<mixin>" + value + "</mixin>";
        }
    };

    function Mixin2() {

    }
    Mixin2.prototype.mixit2 = function(value) {
        return '<mixin2>' + value + '</mixin2>';
    };
    function MODULE() {
        this.__MODULE__ = 'graphit/test/playground';
    }

    MODULE.prototype.run = function() {
        api.log.title(this.__MODULE__);

        var Canvas = graphit.factory.Canvas;
        api.util.injectMixin(Canvas, Mixin);
        api.util.injectMixin(Canvas, Mixin2);

        var opts = {
            width : 50,
            height : 50
        };
        var step = 1;

        var canvas = new Canvas(opts);
        jQuery('body').append(canvas.getElement());
        var ctx = canvas.getCtx();

        function stepRectangle(step) {
            api.shape.rectangle(ctx, step, step, opts.width - (step * 2),
                    opts.height - (step * 2));
        }
        ctx.fillStyle = 'red';
        api.shape.rectangle(ctx, 0, 0, opts.width, opts.height);
        ctx.fillStyle = 'white';
        stepRectangle(step * 2);
        ctx.fillStyle = 'red';
        stepRectangle(step * 4);

        for (var i = 0; i < 256; i++) {
            var c = new Canvas(opts);
            c.copyData(canvas);
            var elm = c.getElement();
            jQuery('body').append(elm);
            jQuery(elm).draggable();
        }
    };
    return new MODULE();
});