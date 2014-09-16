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
    var namespace = require('graphit/namespace');
    var Dlist = require('graphit/datatype/dlist');
    var ArgumentMixin = require('graphit/mixin/argument');
    var RenderableMixin = require('graphit/scene/mixin/renderable');

    var ns = namespace.scene.node;
    var _ns_ = 'node';

    if (_ns_ in ns && ns !== undefined) { return ns[_ns_]; }

    var VALIDATORS = {
        parent : {
            required : true,
            defaultValue: null,
        },
        traversable : {
            required : true,
            defaultValue : true,
        }
    };

    function NODE() {
        this.setArguments(arguments, VALIDATORS);
        this.uid = namespace.genUID();
        this.child = new Dlist();
        this.capability = 0;
    };
    NODE.__namespace__ = 'graphit/scene/node/node';
    ArgumentMixin.call(NODE.prototype);
    RenderableMixin.call(NODE.prototype);

    NODE.prototype.appendChild = function(child) {
        if (child === undefined) { throw 'InvalidValue'; }
        child.parent = this;
        this.child.append(child);
    };

    NODE.prototype.preTraverse = function(fn) {
        fn(this);
        var child = this.child.first;
        while (child != null) {
            child.content.preTraverse(fn);
            child = child.next;
        }
    };

    NODE.prototype.parent = function(value) {
        if (value === undefined) { return this._parent; }
        this._parent = value;
        return this;
    };

    NODE.prototype.traversable = function(value) {
        if (value === undefined) { return this._traverable; }
        this._traversable = value;
        return this;
    };

    NODE.prototype.log = function(msg) {
        console.log(this.__namespace__, this.uid, msg);
    };

    NODE.prototype.toString = function() {
        return '<Node uid="' + this.uid + '" childs="' + this.child.length
                + '">';
    };

    ns[_ns_] = NODE;
    return ns[_ns_];
});
