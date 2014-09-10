define(function(require) {

    require('graphit/scene/include');
    var Manager = require('graphit/asset/manager');

    function T_GAMEOBJECT() {
        this.__namespace__ = 'graphit/test/array';
    }

    T_GAMEOBJECT.prototype.run = function() {
        var actions = ['attack', 'been hit', 'paused', 'running', 'talking',
                       'tipping over', 'walking'];
        var action;
        for (var k = 0; k < actions.length, action = actions[k]; k++) {
        var directions = [' s', ' se', ' e', ' ne', ' n', ' nw', ' w', ' sw'];
        for (var i = 0; i < 11; i++) {
            var t = '' + i;
            while (t.length < 4)
                t = '0' + t;
            var name = 't_barbar';
            var direction = '';
 
            for (var j = 0; j < directions.length, direction = directions[j]; j++) {
                var src = '../graphit/img/sprite/';
                src += name + '/' + action + direction + t + '.bmp';
                console.log('src', src);
                var cname = 'sprite-' + action + '-' + direction + '-' + direction + '-' + t;
                Manager.loadImage(cname, src);
                }
          }
        }
        Manager.waitLoading(function() {
            console.log('Asset Loaded');
            var pool = this.asset.image;
            for (var name in pool) {
                var image = pool[name];
                console.log(image);
                jQuery('body').append(image.element);
            }
        });
    };

    return new T_GAMEOBJECT();
});
