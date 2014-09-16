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

    var ns = require('graphit/namespace');
    var _ns_ = 'assetManager';

    var eType = require('graphit/enum/type');
    var Image = require('graphit/draw/image');
    var SpritePack = require('graphit/draw/spritepack');
    var Tileset = require('graphit/draw/tileset');

    if (_ns_ in ns && ns[_ns_] != undefined) { return ns[_ns_]; }

    
    var __available__ = {};
    function push_available(type, cls) {
        __available__[type] = cls;
    }
    push_available(eType.image, Image);
    push_available(eType.spritepack, SpritePack);
    push_available(eType.tileset, Tileset);

    console.log(__available__);
 
    function MANAGER(noCount) {
        if (noCount === undefined) {
            noCount = false;
        }
        Object.defineProperty(this, 'loading', {
            get: function() {
                if (noCount) {
                    return 0;
                }
                return this._loading;
            },
            set: function(value) {
                this._loading = value;
            }
        });
        this.asset = {};
        this.loading = 0;
        this.event = document.createElement('div');
    }

    MANAGER.prototype.exists = function(type, uid) {
        if (!(type in this.asset)) {
            return false;
        }
        if (!(uid in this.asset[type])) {
            return false;
        }
        return true;
    };

    MANAGER.prototype.load = function(type, uid, src, fnOk, fnFail, linkUid) {
        var that = this;
        if(type === undefined) {
            throw 'UndefinedType';
        } else if (uid === undefined) {
            throw 'UndefinedUid';
        } else if (src === undefined) {
            throw 'UndefinedSrc';
        }
        if (!(type in this.asset)) {
            this.asset[type] = {};
        }
        if (this.exists(type, uid)) { throw 'UidAlreadyPresent'; }
        this.loading++;
        function loadOk(data){
            console.log('THIS', this);
            that.loading--;
            that.asset[type][uid] = this;
            fnOk.call(this, data);
        }
        function loadFail(data) {
            that.loading--;
            console.error('Fail to load ', eType.reverse(type), uid);
            fnFail.call(this, data);
        }
        new __available__[type](this, uid, src, loadOk, loadFail, linkUid);
    };

    MANAGER.prototype.loadTileset = function() {
        var args = [eType.tileset];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return this.load.apply(this, args);
    };

    MANAGER.prototype.loadImage = function() {
        var args = [eType.image];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return this.load.apply(this, args);
    };

    MANAGER.prototype.loadSpritepack = function() {
        var args = [eType.spritepack];
        args.concat(arguments);
        return this.load.apply(this, args);
    };

    MANAGER.prototype.get = function(type, uid) {
        if (!this.exists(type, uid)) {
            throw "NoAssetType:" + type;
        }
        return this.asset[type][uid];
    };

    MANAGER.prototype.addAsset = function(obj) {
//        console.log('Add asset');
        if (!(obj.type in this.asset)) {
            this.asset[obj.type] = {};
        }
        if (obj.name in this.asset[obj.type]) { console.log('NameAlreadyRegistered', obj.name); this.loading--; return true; }
        if (obj.error) {
            this._event_loaded(obj);
            console.error('Fail loading ', obj);
            return false;
        }
//        console.log('Asset added', obj);
        this.loading--;
        this.asset[obj.type][obj.name] = obj;
        return true;
    };

    MANAGER.prototype.addEventListener = function(name, fn) {
        return this.event.addEventListener(name, fn);
    };

    MANAGER.prototype._event_loaded = function(asset) {
        var event = new Event(asset.name);
        event.asset = asset;
        this.event.dispatchEvent(event);
    };

    MANAGER.prototype.waitLoading = function(fn, timeout) {
        if (timeout === undefined) {
            timeout = 1000 * 3;
        }
        var that = this;
        var timeout = Date.now() + timeout;
        function wait() {
            if (that.loading <= 0) {
                fn.call(that);
                return true;
            }
            if (timeout < Date.now()) { fn.call(that); return;/*throw 'AssetManagerTimeout'; */}
            setTimeout(wait, 250);
        }
        wait();
    };

    ns[_ns_] = new MANAGER();
    return ns[_ns_];
});
