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

    var eCap = require('graphit/enum/capability');
    var util = require('graphit/tree/util');
    var Matrix33 = require('graphit/math/matrix33');
    var Vector2d = require('graphit/math/vector2d');

    function TRANSFORM() {
        console.log('Setting tranform capability', this);
        util.setCapability(this, eCap.transform);
        this.transform = new Matrix33();
        this.worldTransform = new Matrix33();
        this.rotate = function(angle) {
            return this.transform.rotate(angle);
        };
        this.translate = function(vector) {
            return this.transform.translate(vector);
        };
        this.translateX = function(x) {
            return this.transform.translateX(x);
        };
        this.translateY = function(y) {
            return this.transform.translateY(y);
        };

        this.position = function(vector) {
            return this.transform.position(vector);
        };

        this.positionX = function(x) {
            console.log('Transform', this);
            return this.transform.positionX(x);
        };

        this.positionY = function(y) {
            return this.transform.positionY(y);
        };
    }
    return TRANSFORM;
});
