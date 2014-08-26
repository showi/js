define(function(require) {
    var glob = require('./global');
    var ModuleClock = require('./Test/Clock');
    var util = require('./util');
    var size = 200;
    var numClock = 1;
    var ps = size / numClock;
    var clocks = [];
    var delay = 50;

    function getClockSize() {
        return util.getMin(util.getDocumentSize());
    }
    console.log('>>> Creating clocks * ', numClock);
    var date = new Date();

    var width = getClockSize();
    var height = width;
    size = getClockSize();
    for (var i = 0; i < numClock; i++) {
        clocks[i] = new ModuleClock(width, height);
        clocks[i].drawMillisecond = true;
        var elm = jQuery('<div class="clock-container"></div>');
        elm.width(size).height(size);
        elm.append(clocks[i].getElement());
        jQuery('body').append(elm);
    }
    window.addEventListener('resize', function(e) {
        for (var i = 0; i < clocks.length; i++) {
            var clock = clocks[i];
            var size = util.getMin(util.getWindowSize());
            clock.width(size).height(size);
            jQuery(clock.canvas.element).width(size).height(size);
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