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

       var canvas = new Canvas(opts);
       console.log(canvas.mixit('BAR'));
       console.log(canvas.mixit2('FOO'));
       
       var Layer = graphit.factory.Layer;
       var opts = {width: 200, height: 200, foo: 'bar'};
       var layer = new Layer(opts);
    };
    return new MODULE();
});