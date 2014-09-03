define(function(require) {
    var util = require('graphit/extend/util');
    console.log('jQuery extend');
    var doc = $(document);
    var win = $(window);
    if (jQuery.fn.center === undefined) {
        util.log('jQuery.fn', 'center');
        jQuery.fn.center = function() {
//            console.log('height:', win.height());
//            console.log('outerHeight:', this.outerHeight());
//            console.log('scrollTop:', win.scrollTop());
//            console.log('top', (win.height() - this.outerHeight()) /2);
            var top = (win.height() - this.outerHeight()) / 2 + win.scrollTop();
            var left= (win.width()  - this.outerWidth())  / 2 + win.scrollLeft();
            console.log('top/left', top, left);
            this.css({
                "position" : "fixed",
                "top" : top + 'px',
                "left" : left + 'px',
            });
            return this;
        };
    }
});
