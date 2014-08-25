define(function(require) {
    jQuery('.clock-container').draggable();
    var glob = require('./global');
    var ModuleClock = require('./Test/Clock');

    var clock = new ModuleClock(200, 200, 'MyClock');
    var clock2 = new ModuleClock(400, 400, 'MyClock2');
    var delay = 125;
    function __callback() {
        clock.draw();
        clock2.draw();
        setTimeout(__callback, delay);
    }
    setTimeout(__callback, delay);
});