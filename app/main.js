define(function(require) {
    jQuery('.clock-container').draggable();
    var glob = require('./global');
    var ModuleClock = require('./Test/Clock');
    var size = 500;
    var numClock = 16;
    var ps = size / numClock;
    var clocks = [];
    var delay = 50;
    for (var i = 0; i < numClock; i++) {
        console.log('[', i, '] Creating clock');
        var s = Math.round(ps * (i + 1));
        clocks[i] = new ModuleClock(s, s);
        clocks[i].drawMillisecond = true;
        var elm = jQuery('<div class="clock-container"></div>');
        elm.append(clocks[i].getElement());
        elm.draggable();
        jQuery('body').append(elm);
    }
    function __callback() {
        var date = new Date();
        for (var i = 0; i < clocks.length; i++) {
            clocks[i].date = date;
//            clocks[i].date.setHours(date.getHours() + 1);
            clocks[i].draw();
        }
        setTimeout(__callback, delay);
    }
    __callback();
});