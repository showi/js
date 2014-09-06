define(function(require) {

    'use strict';

    var modules = ['graphit/namespace', 'graphit/util', 'graphit/enum',
                   'graphit/math', 'graphit/math/vector2d',
                   'graphit/math/matrix33', 
                   'graphit/tree/util',
                   'graphit/tree/factory', 'graphit/tree/node/element',
                   'graphit/tree/node/node', 'graphit/tree/node/primitive',
                   'graphit/tree/node/shape', 'graphit/tree/mixin/transform',
                   'graphit/draw/tool', 'graphit/draw/shape', 'graphit/draw/layer',
                   'graphit/draw/image', 'graphit/draw/doublebuffer', 'graphit/draw/context',
                   'graphit/draw/canvas',
                   'graphit/enum/axis', 'graphit/enum/capability', 'graphit/enum/context',
                   'graphit/enum/math', 'graphit/enum/matrix33', 'graphit/enum/shape',

    ];

    function LOADING() {
        this.__namespace__ = 'graphit/test/loading';
        this.modules = modules;
    }

    LOADING.prototype.run = function() {
        var that = this;
        for (var i = 0; i < this.modules.length; i++) {
            var mName = this.modules[i];
            console.log('>>>>> [', mName, '] Loading');
            try {
                (function(mName) {
                    require([mName], function(module) {
                        that.validate_module(mName, module);
                    });
                })(mName);
            } catch (e) {
                console.error('Error', e);
            }
        }
    };

    function key_exists(module, key) {
        if (!(key in module)) { return false; }
        if (module[key] === undefined) { return false; }
        return true;
    };

    LOADING.prototype.default_validate_key = function(module, key) {
        console.log('- Validate key', key, module[key]);
    };

    LOADING.prototype.validate_key___namespace__ = function(module, key) {
        var value = module[key];
        if (!value.startsWith('graphit/')) {
            console.error('Namespace do not start with graphit/', value);
        }
    };

    LOADING.prototype.validate_module = function(mName, module) {
        var name = (module.name !== undefined)? module.name: module.__namespace__;
        name = (name !== undefined)? name: mName;
        var head = '[' + name + ']';
        console.log('<<', head, 'Loaded name:', module.name, module.__namespace__);
        var keys = ['__namespace__'];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!key_exists(module, key)) {
                console.error('<<', head, 'Missing key', key);
                continue;
            }
            var validator = 'validate_key_' + key;
            if (validator in this && typeof this[validator] == 'function') {
                this[validator].call(this, module, key);
            } else {
                this.default_validate_key(module, key);
            }
        }
    };
    return new LOADING();
});
