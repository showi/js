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
    var InvalidDocumentIdException = require('../exception/InvalidDocumentId');
    var Context = require('../draw/context');
    var util = require('graphit/util');
    var ArgumentMixin = require('../mixin/argument');

    var VALIDATORS = {
        width : {
            required : true,
            defaultValue : 100
        },
        height : {
            required : true,
            defaultValue : 100
        },
        id : {
            required : false,
        }
    };

    function CANVAS(options) {
        this.setArguments(options, VALIDATORS);
        this.element = null;
        this.context = null;
        this._newContext(options.width, options.height, options.id);
    };
    ArgumentMixin.call(CANVAS.prototype);
    CANVAS.__namespace__ = 'graphit/draw/canvas';

    CANVAS.prototype._newContext = function(width, height, id) {
        var elm = undefined;
        if (id !== undefined) {
            elm = document.getElementById(id);
            if (!elm) { throw new InvalidDocumentIdException(id); }
        } else {
            elm = document.createElement('canvas');
            id = namespace.genUID();
        }
        elm.id = 'graphit-canvas-uid-' + id;
        elm.width = width;
        elm.height = height;
        this.element = elm;
        this.context = new Context(elm);
    };

    CANVAS.prototype.copyData = function(src) {
        this.context.copyData(src.context, 0, 0, this.width(), this.height());
    };

    CANVAS.prototype.clone = function() {
        var c = new CANVAS({
            width : this.width(),
            height : this.height()
        });
        c.copyData(this);
        return c;
    };
    
    CANVAS.prototype.copyImage = function(image) {
        this.context.copyImage(image.element);
    };

    CANVAS.prototype.clear = function(color) {
        if (color === undefined) {
            color = 'rgba(0,0,0,1.0)';
        }
        this.context.ctx.fillStyle = color;
        this.context.ctx.fillRect(0, 0, this.width(), this.height());
        return this;
    };

    CANVAS.prototype.getCtx = function() {
        return this.context.ctx;
    };

    CANVAS.prototype.toString = function() {
        return '<canvas width="' + this._width + '" height="' + this._height
                + ' x="' + this.x + '" y="' + this.y + '">';
    };

    CANVAS.prototype.getContext = function() {
        return this.context;
    };

    CANVAS.prototype.getElement = function() {
        return this.element;
    };

    CANVAS.prototype.downScale = function(scale) {
        /*
         * https://stackoverflow.com/questions/
         * 18922880/html5-canvas-resize-downscale-image-high-quality
         */
        var cv = this.context;
        if (!(scale < 1) || !(scale > 0))
            throw ('scale must be a positive number <1 ');
        var sqScale = scale * scale; // square scale = area of source
        // pixel within target
        var sw = this.width(); // source image width
        var sh = this.height(); // source image height
        var tw = Math.floor(sw * scale); // target image width
        var th = Math.floor(sh * scale); // target image height
        // EDIT (credits to @Enric ) : was ceil before, and creating
        // artifacts :
        // var tw = Math.ceil(sw * scale); // target image width
        // var th = Math.ceil(sh * scale); // target image height
        var sx = 0, sy = 0, sIndex = 0; // source x,y, index within
        // source array
        var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y
        // index within
        // target array
        var tX = 0, tY = 0; // rounded tx, ty
        var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight
        // /
        // next
        // weight
        // x / y
        // weight is weight of current source point within target.
        // next weight is weight of current source point within next
        // target's point.
        var crossX = false; // does scaled px cross its current px right
        // border ?
        var crossY = false; // does scaled px cross its current px
        // bottom border ?
        var sBuffer = cv.getCtx().getImageData(0, 0, sw, sh).data; // source
        // buffer
        // 8
        // bit
        // rgba
        var tBuffer = new Float32Array(3 * sw * sh); // target buffer
        // Float32 rgb
        var sR = 0, sG = 0, sB = 0; // source's current point r,g,b
        /*
         * untested ! var sA = 0; //source alpha
         */

        for (sy = 0; sy < sh; sy++) {
            ty = sy * scale; // y src position within target
            tY = 0 | ty; // rounded : target pixel's y
            yIndex = 3 * tY * tw; // line index within target array
            crossY = (tY != (0 | ty + scale));
            if (crossY) { // if pixel is crossing botton target pixel
                wy = (tY + 1 - ty); // weight of point within target
                // pixel
                nwy = (ty + scale - tY - 1); // ... within y+1 target
                // pixel
            }
            for (sx = 0; sx < sw; sx++, sIndex += 4) {
                tx = sx * scale; // x src position within target
                tX = 0 | tx; // rounded : target pixel's x
                tIndex = yIndex + tX * 3; // target pixel index within
                // target array
                crossX = (tX != (0 | tx + scale));
                if (crossX) { // if pixel is crossing target pixel's
                    // right
                    wx = (tX + 1 - tx); // weight of point within target
                    // pixel
                    nwx = (tx + scale - tX - 1); // ... within x+1
                    // target pixel
                }
                sR = sBuffer[sIndex]; // retrieving r,g,b for curr src
                // px.
                sG = sBuffer[sIndex + 1];
                sB = sBuffer[sIndex + 2];

                /*
                 * !! untested : handling alpha !! sA = sBuffer[sIndex +
                 * 3]; if (!sA) continue; if (sA != 0xFF) { sR = (sR *
                 * sA) >> 8; // or use /256 instead ?? sG = (sG * sA) >>
                 * 8; sB = (sB * sA) >> 8; }
                 */
                if (!crossX && !crossY) { // pixel does not cross
                    // just add components weighted by squared scale.
                    tBuffer[tIndex] += sR * sqScale;
                    tBuffer[tIndex + 1] += sG * sqScale;
                    tBuffer[tIndex + 2] += sB * sqScale;
                } else if (crossX && !crossY) { // cross on X only
                    w = wx * scale;
                    // add weighted component for current px
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tX+1) px
                    nw = nwx * scale
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                } else if (crossY && !crossX) { // cross on Y only
                    w = wy * scale;
                    // add weighted component for current px
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tY+1) px
                    nw = nwy * scale
                    tBuffer[tIndex + 3 * tw] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                } else { // crosses both x and y : four target points
                    // involved
                    // add weighted component for current px
                    w = wx * wy;
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // for tX + 1; tY px
                    nw = nwx * wy;
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                    // for tX ; tY + 1 px
                    nw = wx * nwy;
                    tBuffer[tIndex + 3 * tw] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                    // for tX + 1 ; tY +1 px
                    nw = nwx * nwy;
                    tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 5] += sB * nw;
                }
            } // end for sx
        } // end for sy

        // create result canvas
        var resCanvas = new CANVAS({
            width : tw,
            height : th
        });
        // var resCV = document.createElement('canvas');
        // resCV.width = tw;
        // resCV.height = th;
        var resCtx = resCanvas.getCtx(); // resCV.getContext('2d');
        var imgRes = resCtx.getImageData(0, 0, tw, th);
        var tByteBuffer = imgRes.data;
        // convert float32 array into a UInt8Clamped Array
        var pxIndex = 0; //  
        for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
            tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
            tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
            tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
            tByteBuffer[tIndex + 3] = 255;
        }
        // writing result to canvas.
        resCtx.putImageData(imgRes, 0, 0);
        return resCanvas;
    }, CANVAS.prototype.width = function(value) {
        if (value !== undefined) {
            this.element.width = value;
            return this;
        }
        return this.element.width;
    };

    CANVAS.prototype.height = function(value) {
        if (value !== undefined) {
            this.element.height = value;
            return this;
        }
        return this.element.height;
    };

    return CANVAS;
});
