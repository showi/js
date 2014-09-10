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
    var Image = require('graphit/draw/image');

    var _ns_ = 'assetManager';

    if (_ns_ in ns && ns[_ns_] != undefined) { return ns[_ns_]; }

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
        this.asset = {
            image : {},
        };
        this.loading = 0;
        this.event = document.createElement('div');
    }

    MANAGER.prototype.loadImage = function(uid, src) {
        if (uid in this.asset) { throw 'UidAlreadyPresent'; }
        this.loading++;
        new Image(this, uid, src);
    };

    MANAGER.prototype.addAsset = function(obj) {
        if (obj.name in this.asset[obj.type]) { throw 'NameAlreadyRegistered'; }
        // console.log('Add asset', obj);
        if (obj.error) {
            this._event_loaded(obj);
            console.error('Fail loading ', obj);
            return false;
        }
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
    }
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
    }
    ns[_ns_] = new MANAGER();
    return ns[_ns_];
});
