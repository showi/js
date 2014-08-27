define(function(require) {

    var api = require('../api');

    var Layer = require('../draw/Layer');
    var Canvas = require('graphit/draw/Canvas');
    
    var Mixin = {
            mixit: function(value) {
                return "<mixin>" + value + "</mixin>";
            }
    };

    function Mixin2 () {
        
    }
    Mixin2.prototype.mixit2 = function(value) {
      return '<mixin2>'+value+'</mixin2>';  
    };
    function MODULE() {
        this.__MODULE__ = 'graphit/test/playground';
    }

    MODULE.prototype.run = function() {
       api.log.title(this.__MODULE__);

       
       var Canvas = graphit.factory.Canvas;
       console.log('Canvas', Canvas);
       api.util.injectMixin(Canvas, Mixin);
       api.util.injectMixin(Canvas, Mixin2);

       var opts = { width: 200, height: 200 };
       var canvas = new Canvas(opts);
       jQuery('body').append(canvas.getElement());
       var ctx = canvas.getCtx();
       ctx.fillStyle = 'red';
       api.shape.rectangle(ctx, 0, 0, opts.width, opts.height);
       ctx.fillStyle = 'white';
       api.shape.rectangle(ctx, 10, 10, opts.width - 20, opts.height - 20);
       ctx.fillStyle = 'red';
       api.shape.rectangle(ctx, 20, 20, opts.width - 40, opts.height - 40);
       
    };
    return new MODULE();
});