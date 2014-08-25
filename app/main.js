define(function(require) {
    jQuery('.clock-container').draggable();
    var glob = require('./global');
    var ModuleClock = require('./Test/Clock');
    var size = 600;
    var numClock = 4;
    var clocks = [];
    var delay = 50;
    for (var i = 0; i < numClock; i++) {
        var s = Math.round(size / (i + 1));
        clocks[i] = new ModuleClock(s, s, 'MyClock' + (i + 1));
        clocks[i].drawMillisecond = true;
    }
    function __callback() {
        for (var i = 0; i < clocks.length; i++) {
            clocks[i].date = new Date();
            clocks[i].draw();
        }
        setTimeout(__callback, delay);
    }
    __callback();
});