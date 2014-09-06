define(function(require) {
    
    var modules = [
//                   'graphit/namespace', 
                   'graphit/util',
//                   'graphit/math',
//                   'graphit/math/vector2d'
    ];

    function LOADING() {
        this.__namespace__ = 'graphit/test/loading';
        this.modules = modules;
    }

    LOADING.prototype.run = function() {
        for(var i = 0; i < this.modules.length; i++) {
            require([this.modules[i]], function(module) {
                console.log('[Module',module.__namespace__,'] loaded');
            });
        }
    };

    return new LOADING();
});
