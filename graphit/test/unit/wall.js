define(function(require) {
    
    'use strict';

    var Canvas = require('graphit/draw/canvas');
    var shape = require('graphit/draw/shape');

    function MODULE() {

        var opts = {
            width : 50,
            height : 50
        };
        var step = 1;

        var canvas = new Canvas(opts);
        jQuery('body').append(canvas.getElement());
        var ctx = canvas.getCtx();

        function stepRectangle(step) {
            shape.rectangle(ctx, step, step, opts.width - (step * 2),
                    opts.height - (step * 2));
        }
        ctx.fillStyle = 'red';
        shape.rectangle(ctx, 0, 0, opts.width, opts.height);
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