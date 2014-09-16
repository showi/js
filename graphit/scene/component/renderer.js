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

    var namespace = require('graphit/namespace');
    var ns = namespace.scene;
    var Matrix33 = require('graphit/math/matrix33');
    var math = require('graphit/math');
    var Component = require('graphit/scene/component');
    var eType = require('graphit/scene/enum/type');

    function Renderer() {
        Component.call(this);
        this.type = eType.renderer;
        this.bounds = undefined;
        this.castShadows = undefined;
        this.isPartOfStaticBatch = undefined;
        this.isVisible = true;
        this.lightmapIndex = undefined;
        this.lightmapTilingOffset = undefined;
        this.lightProbeAnchor = undefined;
        this.localToWorldMatrix = undefined;
        this.material = undefined;
        this.materials = undefined;
        this.receiveShadows = undefined;
        this.sharedMaterial = undefined;
        this.sharedMaterials = undefined;
        this.sortingLayerID = undefined;
        this.sortingOrder = undefined;
        this.sortingLayerName = undefined;
        this.sortingOrder = undefined;
        this.userLightProbes = undefined;
        this.worldtoLocalMatrix = undefined;

    }
    Renderer.prototype = Object.create(Component.prototype);

    Renderer.prototype.draw = function(renderer) {
        throw 'NotImplemented';
    };
    return Renderer;
});
