/*
Copyright (c) 2014 Joachim Basmaison

This file is part of graphit <https://github.com/showi/js>

graphit is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See the GNU General Public License for more details.
 */
define(function(require) {

    'use strict';

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
