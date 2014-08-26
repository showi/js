define(function(require) {

    var glob = require('../global');
    var ModuleClock = require('../Draw/Widget/Clock');
    var util = require('../util');
    var log = require('../log');
    
    function MODULE() {
        this.__MODULE__ = 'graphit/test/clock';
    }

    MODULE.prototype.run = function() {
        var maxSize = 320;
        var numClock = 24;
        var clocks = [];
        var delay = 1000;

        function getClockSize() {
            return maxSize;
            // return util.getMin(util.getDocumentSize());
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
            jQuery('body').append(elm);
        }
        log.action('Register RESIZE event listener');
        window.addEventListener('resize', function(e) {
            for (var i = 0; i < clocks.length; i++) {
                var clock = clocks[i];
                var size = util.getMin(util.getWindowSize());
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
        jQuery('.clock-container').draggable().resizable();
        log.action('Running callback');
        __callback();
    };
    return new MODULE();
});