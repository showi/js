define(function(require) {

    var util = require('graphit/util');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');
    var Canvas = require('graphit/draw/canvas');

    var element = jQuery('<div id="graphit-test-matrix33" class="test-container"></div>');
    var body = jQuery('body');
    var PASS = 10000000;

    function pageScroll() {
        window.scrollBy(0,100);
        scrolldelay = setTimeout(pageScroll,10);
    }
    body.css({
        'background-color' : 'black',
        color : 'white',
        scroll : 'auto',
    });
//    pageScroll();
    body.append(element);
    
    var rex_nl = new RegExp("\\n");
    rex_nl.global = true;
    function log() {
        var msg = '';
        for (var i = 0; i < arguments.length; i++) {
            var a = arguments[i] + '';
            a = a.replace('<', '&lt;');
            a = a.replace('>', '&gt;');
            msg += a + ' ';
        }
        msg = jQuery('<div class="msg"><pre>' +  msg + '</pre></div>');
        element.append(msg);
    }

    function MATH() {
        this.__namespace__ = 'graphit/test/math';
    }

    MATH.prototype.run = function() {
//        pageScroll();
    };

    MATH.prototype.test_translate = function() {
        var m = new Matrix33();
        function l() {
            log(m.toString());
        }
        l();
        var v = new Vector2d(2, 3);

        for (var i = 0; i < 3; i++) {
            log('Translating with vector', v);
            m.translate(v);
            l();
        }
        log('Identity');
        m.identity();
        l();
    };
    MATH.prototype.test_rotate = function() {
        var m = new Matrix33();
        function l() {
            log(m.toString());
        }
        l();
        var angle = 10;
        for (var i = 0; i < 3; i++) {
            log('Rotation with angle', angle);
            m.rotate(angle);
        }
        log('Identity');
        m.identity();
        l();
    };
    MATH.prototype.test_determinant = function() {
        var m = new Matrix33();
        function l() {
            log(m.toString());
        }
        l();
        var angle = 10;
        for (var i = 0; i < 3; i++) {
            m.rotate(angle);
        }
        var d = m.determinant();
        log(m, 'determinant', d);
        log('Identity');
        m.identity();
        l();
    };
    function testfn(m, name, value) {
        var pass = PASS;
        var st = new Date();
        log(name, '> Testing function with', pass, 'pass');
        function async() {
            var f = m[name];
            var res = undefined;
            for (var i = 0; i < pass; i++) {
                res = f.call(m, value);
            }
            log(name, 'last result', res);
            var et = new Date();
            var diff = et - st;
            log(name, '> Time', diff, 'ms');
        }
        async();
//        setTimeout(async, 0);
    }

    MATH.prototype.test_rotateSpeed = function() {
        var m = new Matrix33();
        testfn(m, 'rotate', 10);
        log(m, m.toString());
    };

    MATH.prototype.test_rotateSpeed = function() {
        var m = new Matrix33();
        testfn(m, 'determinant');
        log(m, m.toString());
    };

    MATH.prototype.test_fillSpeed = function() {
        var m = new Matrix33();
        testfn(m, 'fill', 43);
        log(m);
        testfn(m, 'fillMedium', 44);
        log(m);
        testfn(m, 'fillSlow', 44);
        log(m);
    };

    MATH.prototype.test_identitySpeed = function() {
        var m = new Matrix33();
        m.fill(44);
        testfn(m, 'identity');
        log(m);
        m.fill(45);
        testfn(m, 'identityMedium');
        log(m);
        m.fill(46);
        testfn(m, 'identitySlow');
        log(m);
    };

    MATH.prototype.test_speedMul = function() {
        var A = new Matrix33([1,2,3,4,5,6,7,8,9]);
        var B = new Matrix33([1,2,3,4,5,6,7,8,9]);
        var st = new Date();
        for (var i = 0; i < PASS; i++) {
            A.mul(B);
        }
        var diff = new Date() - st;
        log('mul', 'pass', PASS, 'time', diff, 'ms');
    };

    MATH.prototype.test_mul = function() {
        var A = new Matrix33([23,92,72,44,81,92,41,49,64]);
        var B = new Matrix33([11,94,74,38,23,71,52,29,59]);
        var C = new Matrix33([7493, 6366, 12482,
                              8346, 8667, 14435,
                              5641, 6837, 10289]);
        log('Matrix mul', A.toString(), B.toString());
        A.mul(B);
        log('Result', A.toString());
        if(!A.equal(C)) {
            throw 'MatrixMultiplicationBadResult';
        }
        A = new Matrix33([1,2,3,4,5,6,7,8,9]);
        B = new Matrix33([1,2,3,4,5,6,7,8,9]);
        C = new Matrix33([30, 36, 42, 66, 81, 96, 102, 126, 150]);
        A.mul(B);
        log('Result', A.toString());
        if(!A.equal(C)) {
            throw 'MatrixMultiplicationBadResult';
        }
    };
    return new MATH();
});
