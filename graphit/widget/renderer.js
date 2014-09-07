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

    WIDGET.prototype.build = function(parent) {
        parent = (parent !== undefined) ? parent : jQuery('body');
        var id = this.renderer.uid;
        var namespace = 'graphit/renderer/renderer';

        var root = jQuery('<div id="'+id+'"></div>');
        root.id = id;
        root.addClass('graphit-container renderer');
        root.css({
            'background-color' : 'black',
            color : 'white'
        });
        var elm = jQuery('<div></div>');
        elm.html('<h2>' + namespace + '/' + root.id + '</h2>');

        this.fps = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">fps</div>');
        elm.append(this.fps);
        root.append(elm);

        this.ups = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">ups</div>');
        elm.append(this.ups);
        root.append(elm);

        this.delta = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">delta</div>');
        elm.append(this.delta);
        root.append(elm);
        
        this.skipped = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">skip</div>');
        elm.append(this.skipped);
        root.append(elm);

        this.skippedDraw = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">skip draw</div>');
        elm.append(this.skippedDraw);
        root.append(elm);

        this.numUpdate = jQuery('<div class="field-value"></div>');
        elm = jQuery('<div class="field-key">num. update</div>');
        elm.append(this.numUpdate);
        root.append(elm);
        
        root.draggable();
        this.element = root;
        parent.append(root);
    };

    WIDGET.prototype.update = function() {
        var fps = Math.floor(this.renderer.fps() * 1000);
        var ups = Math.floor(this.renderer.ups() * 1000);
        var delta = Math.floor(this.renderer.delta * 100) / 100;
        console.log('fps', fps);
        this.fps.text(fps);
        this.ups.text(ups);
        this.delta.text(delta);
        this.skipped.text(this.renderer.skipped);
        this.skippedDraw.text(this.renderer.skippedDraw);
        this.numUpdate.text(this.renderer.numUpdate);
    };

    return WIDGET;

});
