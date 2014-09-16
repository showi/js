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

    // var eCap = require('graphit/enum/capability');
    var scene = require('graphit/scene/util');
    var shape = require('graphit/draw/shape');
    var Vector2d = require('graphit/math/vector2d');
    var Matrix33 = require('graphit/math/matrix33');
    var eAxis = require('graphit/enum/axis');
    var eShape = require('graphit/enum/shape');
    var fact = require('graphit/math/factory');
    var GameObject = require('graphit/scene/gameobject');
    var TransformComponent = require('graphit/scene/component/transform');
    var ParameterMixin = require('graphit/mixin/argument');

    var VALIDATORS = {
        kind : {
            required : true
        },
        pos : {
            required : false,
        },
        size : {
            required : true,
        },
    };

    function SHAPE() {
        this.setArguments(arguments, VALIDATORS);
        this.name = SHAPE.__namespace__;
        GameObject.call(this, arguments);
        this.addComponent(TransformComponent);
        this.setUp(this.kind);
    };

    SHAPE.prototype = Object.create(GameObject.prototype);
    ParameterMixin.call(SHAPE.prototype);
    SHAPE.__namespace__ = 'graphit/scene/node/shape';

    SHAPE.prototype.setUp = function(kind) {
        var meth = 'setUp_' + eShape.reverse(kind);
        this.transform.positionX(this.pos.x);
        this.transform.positionY(this.pos.y);
        return this[meth]();
    };

    SHAPE.prototype.setUp_line = function() {
        // console.log('Setting up line:');
        this.a = this.size.a;
        this.b = this.size.b;

    };

    SHAPE.prototype.setUp_rectangle = function() {
        Object.defineProperty(this, 'width', {
            get : function() {
                return this.u.x * 2;
            },
            set : function(width) {
                return this.u.x = width / 2;
            },
        });
        Object.defineProperty(this, 'height', {
            get : function() {
                return this.v.y * 2;
            },
            set : function(height) {
                return this.v.y = height / 2;
            },
        });
        this.u = new Vector2d(this.size.width / 2, 0);
        this.v = new Vector2d(0, this.size.height / 2);
    };

    SHAPE.prototype.setUp_circle = function() {
        Object.defineProperty(this, 'width', {
            get : function() {
                return this.u.x * 2;
            },
            set : function(width) {
                return this.u.x = width / 2;
            },
        });
        Object.defineProperty(this, 'height', {
            get : function() {
                return this.u.x * 2;
            },
            set : function(height) {
                return this.u.x = height / 2;
            },
        });
        this.u = new Vector2d(this.size.width / 2, 0);
    };

    return SHAPE;
});
