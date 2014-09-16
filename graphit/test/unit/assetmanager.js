define(function(require) {

    require('graphit/scene/include');
    var Manager = require('graphit/asset/manager');
    var eType = require('graphit/enum/type');

    function log() {
        console.log.apply(console, arguments);
    }

    function T_ASSETMANAGER() {
        ;
    }
    T_ASSETMANAGER.__namespace = 'graphit/test/array';

    T_ASSETMANAGER.prototype.run = function() {
        log('Loading Tileset');
        var url = 'img/tile/iso-64x64-outside.png';
        Manager.load(eType.tileset, url, url, function(data) {
            console.log('Tileset loaded', url, data, this);
        });
    };

    T_ASSETMANAGER.prototype.no_test_spritepack = function() {
        var actions = ['attack', 'been hit', 'paused', 'running', 'talking',
                       'tipping over', 'walking'];
        var action;
        for (var k = 0; k < actions.length, action = actions[k]; k++) {
            var directions = [' s', ' se', ' e', ' ne', ' n', ' nw', ' w',
                              ' sw'];
            for (var i = 0; i < 7; i++) {
                var t = '' + i;
                while (t.length < 4)
                    t = '0' + t;
                var name = 't_barbar';
                var direction = '';

                for (var j = 0; j < directions.length,
                                direction = directions[j]; j++) {
                    var src = '../js/img/sprite/';
                    src += name + '/' + action + direction + t + '.bmp';
                    var cname = 'sprite-' + action + '-' + direction + '-'
                            + direction + '-' + t;
                    Manager.loadImage(cname, src);
                }
            }
        }
        try {
            Manager.waitLoading(function() {
                var pool = this.asset.image;
                for ( var name in pool) {
                    var image = pool[name];
                    jQuery('body').append(image.element);
                }
            });
        } catch (e) {
            var pool = this.asset.image;
            for ( var name in pool) {
                var image = pool[name];
                jQuery('body').append(image.element);
            }
        }
    };

    return new T_ASSETMANAGER();
});
