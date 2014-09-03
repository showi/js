define(function(require) {

    var util = require('graphit/extend/util');
    var win = $(window);

    if (jQuery.fn.center === undefined) {
        util.log('jQuery.fn', 'center');
        jQuery.fn.center = function() {
            var top = (win.height() - this.outerHeight()) / 2
                    + win.scrollTop();
            var left = (win.width() - this.outerWidth()) / 2
                    + win.scrollLeft();
            this.css({
                "position" : "fixed",
                "top" : top + 'px',
                "left" : left + 'px',
            });
            return this;
        };
    }
});
