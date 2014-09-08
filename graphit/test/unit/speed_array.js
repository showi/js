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

    var test = require('graphit/test/util');
    var Dlist = require('graphit/datatype/dlist');
    var gArray = require('graphit/datatype/array');

    function TEST_SPEED_ARRAY() {
        this.elm = {
            'foo' : 'bar'
        };
    }

    TEST_SPEED_ARRAY.__namespace__ = 'graphit/test/unit/speed_array';

    TEST_SPEED_ARRAY.prototype.speed_dlist_append = function() {
        var a = new Dlist();
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.append(this.elm);
            }
        }
//        console.log('a', a.length);
    };
    
    TEST_SPEED_ARRAY.prototype.speed_array_append = function() {
        var a = [];
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.push(this.elm);
            }
        }
//        console.log('a', a.length);
    };
        
    TEST_SPEED_ARRAY.prototype.speed_dlist_empty = function() {
        var a = new Dlist();
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.append(this.elm);
            }
            a.empty();
        }
//        console.log('a', a.length);
    };

    TEST_SPEED_ARRAY.prototype.speed_array_create = function() {
        var a = [];
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.push(this.elm);
            }
            a = [];
        }
//        console.log('a', a.length);
    };

    TEST_SPEED_ARRAY.prototype.speed_array_empty = function() {
        var a = [];
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.push(this.elm);
            }
            while(a.length > 0)
                a.pop();
        }
//        console.log('a', a.length);
    };

    TEST_SPEED_ARRAY.prototype.speed_garray_empty = function() {
        var a = new gArray();
        console.log(a);
        var i, j;
        for (i = 0; i < test.numPassMedium; i++) {
            for (j = 0; j < test.numPassLow; j++) {
                a.push(this.elm);
            }
            a.empty();
        }
//        console.log('a', a.length);
    };
    return new TEST_SPEED_ARRAY();
});
