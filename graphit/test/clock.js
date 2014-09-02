define(function(require) {

    var glob = require('../namespace');
    var ModuleClock = require('../draw/widget/clock');
    var util = require('../util');
    var log = require('../log');
    
    function MODULE(options) {
        this.__MODULE__ = 'graphit/test/clock';
        if (options !== undefined) {
            util.setParameters(this, options, {
                width: {required: true, defaultValue: 200},
                height: { require: true,defaultValue: 200},
                max_size: {required: false, defaultValue: 200},
                numClock: {required: true, 'default': 1 },
            });
        }
    }

    MODULE.prototype.run = function() {
        var maxSize = 320;
        var numClock = 1;
        var clocks = [];
        var delay = 100;

        function getClockSize() {
//            return util.getMin(util.getDocumentSize());
            return maxSize;
        }
        log.action('Creating ' + numClock + ' clocks');
        var width = getClockSize();
        var height = width;
        var size = getClockSize();
        for (var i = 0; i < numClock; i++) {
            clocks[i] = new ModuleClock(width, height);
            clocks[i].drawMillisecond = true;
            var elm = jQuery('<div class="clock-container"></div>');
            elm.width(size).height(size);
            elm.append(clocks[i].getElement());
            clocks[i].element = elm;
            elm.css({position: 'absolute', top: '2em', left: '2em'});
            jQuery('body').append(elm);
        }
        log.action('Register RESIZE event listener');
//        window.addEventListener('resize', function(e) {
//            for (var i = 0; i < clocks.length; i++) {
//                var clock = clocks[i];
//                var size = util.getMin(util.getWindowSize());
//                // clock.width(size).height(size);
//                // clock.element.width(size).height(size);
//            }
//        }, false);
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
        jQuery('.clock-container').draggable();
        log.action('Running callback');
        __callback();
    };
    return new MODULE;
});