define(function(require) {
    var glob = require('graphit/namespace');

    var util = require('graphit/util');
    var log = require('graphit/log');
    var math = require('graphit/math');
    var ModuleClock = require('graphit/widget/clock');

    function MODULE(options) {
        this.__namespace__ = 'graphit/test/clock';
        if (options !== undefined) {
            util.setParameters(this, options, {
                width : {
                    required : true,
                    defaultValue : 200
                },
                height : {
                    require : true,
                    defaultValue : 200
                },
                max_size : {
                    required : false,
                    defaultValue : 200
                },
                numClock : {
                    required : true,
                    'default' : 1
                },
            });
        }
    }

    MODULE.prototype.stop = function() {
        jQuery('.clock-container').remove();
    };

    MODULE.prototype.run = function() {
        var body = jQuery('body');
        body.css({
            margin : 0,
            padding : 0,
            overflow : 'hidden',
        });

        var numClock = math.randInt(1, 128);
        var clocks = [];
        var delay = 100;
        var size = util.documentSize();
        var ratio = Math.floor(Math.sqrt( numClock ));
        var max = math.max(size.x, size.y) / ratio;
        var min = math.min(size.x, size.y) / ratio;
        var width = max;
        var height = min;

        console.log('size/ratio/width/height', size, ratio, width, height);
        for (var i = 0; i < numClock; i++) {
            clocks[i] = new ModuleClock(width, height);
            clocks[i].drawMillisecond = true;
//            var elm = jQuery('<div class="clock-container"></div>');
            //elm.width(width).height(height);
            //elm.append(clocks[i].getElement());
            //clocks[i].element = elm;
            jQuery('body').append(clocks[i].getElement());
        }
        log.action('Register RESIZE event listener');
        window.addEventListener('resize', function(e) {
            for (var i = 0; i < clocks.length; i++) {
                var clock = clocks[i];
                var size = math.min(util.getWindowSize());
                // clock.width(size).height(size);
                // clock.element.width(size).height(size);
            }
        }, false);
        function __callback() {
            var date = new Date();
            for (var i = 0; i < clocks.length; i++) {
                var clock = clocks[i];
                date.setHours(date.getHours() + i);
                clock.date = date;
                clock.draw();
            }
            setTimeout(__callback, delay);
        }
        jQuery('.clock-container .test').draggable();
        log.action('Running callback');
        __callback();
    };

    return new MODULE;
});
