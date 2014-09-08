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

    var util = require('graphit/util');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    var Canvas = require('graphit/draw/canvas');
    var test = require('graphit/test/util');

    // var element = jQuery('<div id="graphit-test-matrix33"
    // class="test-container"></div>');
    // var body = jQuery('body');
    // var PASS = 1000;
    //
    // function pageScroll() {
    // window.scrollBy(0,100);
    // scrolldelay = setTimeout(pageScroll,10);
    // }
    // body.css({
    // 'background-color' : 'black',
    // color : 'white',
    // scroll : 'auto',
    // });
    // body.append(element);

    // var rex_nl = new RegExp("\\n");
    // rex_nl.global = true;

    // function log() {
    // console.log.apply(console, arguments);
    // var msg = '';
    // for (var i = 0; i < arguments.length; i++) {
    // var a = arguments[i] + '';
    // a = a.replace('<', '&lt;');
    // a = a.replace('>', '&gt;');
    // msg += a + ' ';
    // }
    // msg = jQuery('<div class="msg"><pre>' + msg + '</pre></div>');
    // element.append(msg);
    // }

    function TEST_SPEED_MATRIX33() {

    }
    TEST_SPEED_MATRIX33.__namespace__ = 'graphit/test/speed_matrix33';

    TEST_SPEED_MATRIX33.prototype.run = function() {
        ;
    };

    TEST_SPEED_MATRIX33.prototype.speed_translate = function() {
        var v = new Vector2d(2, 3);
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.translate(v);
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_rotate = function() {
        var m = new Matrix33();
        var angle = 10;
        for (var i = 0; i < test.numPass; i++) {
            m.rotate(angle);
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_determinant = function() {
        var m = new Matrix33();
        m._data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var d = null;
        for (var i = 0; i < test.numPass; i++) {
            d = m.determinant();
        }
    };


    TEST_SPEED_MATRIX33.prototype.speed_fill = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.fill(43);
        }
    };
    TEST_SPEED_MATRIX33.prototype.speed_fillMedium = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.fillMedium(43);
        }
    };
    TEST_SPEED_MATRIX33.prototype.speed_fillSlow = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.fillSlow(43);
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_identity = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.identity();
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_identityMedium = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.identityMedium();
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_identitySlow = function() {
        var m = new Matrix33();
        for (var i = 0; i < test.numPass; i++) {
            m.identitySlow();
        }
    };

    TEST_SPEED_MATRIX33.prototype.speed_mul = function() {
        var A = new Matrix33([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        var B = new Matrix33([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (var i = 0; i < test.numPass; i++) {
            A.mul(B);
        }
    };

    TEST_SPEED_MATRIX33.prototype.test_mul = function() {
        var A = new Matrix33([23, 92, 72, 44, 81, 92, 41, 49, 64]);
        var B = new Matrix33([11, 94, 74, 38, 23, 71, 52, 29, 59]);
        var C = new Matrix33([7493, 6366, 12482, 8346, 8667, 14435, 5641,
                              6837, 10289]);
        console.log('Matrix mul', A.toString(), B.toString());
        A.mul(B);
        console.log('Result', A.toString());
        if (!A.equal(C)) { throw 'MatrixMultiplicationBadResult'; }
        A = new Matrix33([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        B = new Matrix33([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        C = new Matrix33([30, 36, 42, 66, 81, 96, 102, 126, 150]);
        A.mul(B);
        console.log('Result', A.toString());
        if (!A.equal(C)) { throw 'MatrixMultiplicationBadResult'; }
    };
    return new TEST_SPEED_MATRIX33();
});
