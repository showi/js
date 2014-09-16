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

    var Sprite = require('graphit/scene/sprite');
    var Texture = require('graphit/scene/texture/texture2d');
    var math = require('graphit/math/factory');
    var Canvas = require('graphit/draw/canvas');
    var Asset = require('graphit/asset/manager');
    var body = jQuery('body');

    function T_SPRITE() {
        ;
    }

    function RenderSprite() {

    }
    RenderSprite.prototype.render = function(ctx, sprite, elapsed) {
        var r = sprite.rect;
        if (sprite.fillStyle !== undefined) {
            ctx.save();
            ctx.fillStyle = sprite.fillStyle;
            ctx.fillRect(r.x, r.y, r.width, r.height);
            ctx.restore();
        }
//        var data = ctx.getImageData(r.x, r.y, r.width, r.height);
//        
//        console.log('image', data);
//        var len = width * height;
//        for(var i = 0; i < len; i++) {
//            
//        }
        ctx.drawImage(sprite.texture.image, r.width, r.height);
    };

    T_SPRITE.prototype.run = function() {
        var canvas = new Canvas({
            width : 800,
            height : 600
        });
        Asset.loadSpritePack('t_barbar', 'img/sprite/t_barbar/pack.json');
        Asset.loadSpritePack('t_harrytheorc', 'img/sprite/t_harrytheorc/pack.json');
        body.append(canvas.element);
        var ctx = canvas.getCtx();
        var r = new RenderSprite();
        var tex = new Texture(100, 100);
        tex.loadImage('toto', 'img/sprite/t_barbar/attack e0000.bmp',
                      function(img) {
                          var s = new Sprite(tex, math.rect.Create(0, 0, 64,
                                                                   64));
                          s.fillStyle = 'blue';
                          console.log('plop');
                          r.render(ctx, s, 1);
                      });
    };

    return new T_SPRITE();
});
