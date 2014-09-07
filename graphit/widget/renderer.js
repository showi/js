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

    function WIDGET(renderer) {
        this.renderer = renderer;
    }

    function wKeyValue(key) {
        var element = {
            root : jQuery('<div class="field"></div>'),
            key : jQuery('<div class="value"></div>'),
            value : jQuery('<div class="key">fps</div>'),
        };
        element.key.text(key);
        var elm = element.root;
        elm.append(element.key);
        elm.append(element.value);
        element.element = elm;
        return element;
    }

    WIDGET.prototype.build = function(parent) {
        parent = (parent !== undefined) ? parent : jQuery('body');
        var id = this.renderer.uid;
        var namespace = 'graphit/renderer/renderer';

        var root = jQuery('<div id="' + id + '"></div>');
        root.id = id;
        root.addClass('graphit-container renderer');
        root.css({
            'background-color' : 'black',
            color : 'white'
        });
        var elm = jQuery('<div></div>');
        elm.html('<h2>' + namespace + '/' + root.id + '</h2>');

        var keys = ['fps', 'ups', 'delta', 'skipped', 'skippedDraw',
                    'numUpdate', 'nodeRendered'];
        var key = undefined;
        for (var i = 0; i < keys.length, key = keys[i]; i++) {
            this[key] = wKeyValue(key);
            root.append(this[key].element);
        }
        root.draggable();
        this.element = root;
        parent.append(root);
    };

    WIDGET.prototype.update = function() {
        var fps = Math.floor(this.renderer.fps() * 1000);
        var ups = Math.floor(this.renderer.ups() * 1000);
        var delta = Math.floor(this.renderer.delta * 100) / 100;
        console.log('fps', fps);
        this.fps.value.text(fps);
        this.ups.value.text(ups);
        this.delta.value.text(delta);
        this.skipped.value.text(this.renderer.skipped);
        this.skippedDraw.value.text(this.renderer.skippedDraw);
        this.numUpdate.value.text(this.renderer.numUpdate);
        this.nodeRendered.value.text(this.renderer.nodeRendered);
    };

    return WIDGET;

});
