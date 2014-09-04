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

    return {
        __MODULE__ : 'graphit/log',
        log : function(msg) {
            console.error.apply(console, arguments);
        },
        error : function(msg) {
            var args = ['[-]']
            args = args.concat(arguments);
            console.error.apply(console, args);
        },
        action : function(msg) {
            msg = '%c >> ' + msg;
            console.log(msg, 'background: #444; color: #fff');
        },
        result : function(msg) {
            console.log('<<', msg);
        },
        title : function(msg) {
            msg = '%c >>> ' + msg + ' <<<';
            console.log(msg, 'background: #222; color: #bada55');
        }
    };

});
