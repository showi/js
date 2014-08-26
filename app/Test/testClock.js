define(function(require) {
    var glob = require('../global');
    var ModuleClock = require('../Test/Clock');
    var util = require('../util');
    var maxSize = 400;
    var numClock = 10;
    var clocks = [];
    var delay = 1000;

    function getClockSize() {
        return maxSize;
        return util.getMin(util.getDocumentSize());
    }
    console.log('>>> Creating clocks * ', numClock);
    var date = new Date();

    var width = getClockSize();
    var height = width;
    var size = getClockSize();
    for (var i = 0; i < numClock; i++) {
        clocks[i] = new ModuleClock(width, height);
        var elm = jQuery('<div class="clock-container"></div>');
        elm.width(size).height(size);
        elm.append(clocks[i].getElement());
        clocks[i].element = elm;
        jQuery('body').append(elm);
    }
    window.addEventListener('resize', function(e) {
        for (var i = 0; i < clocks.length; i++) {
            var clock = clocks[i];
            var size = util.getMin(util.getWindowSize());
            clock.width(size).height(size);
            clock.element.width(size).height(size);
        }
    }, false);
    function __callback() {
        var date = new Date();
        for (var i = 0; i < clocks.length; i++) {
            var clock = clocks[i];
            clock.date = date;
            clock.draw();
         }
        setTimeout(__callback, delay);
    }
    jQuery('.clock-container').draggable().resizable();
    __callback();
});