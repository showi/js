define(function(require) {
    
    require('graphit/tree/node/element');
    require('graphit/tree/node/primitive');
    var ns = require('graphit/namespace');
    var util = require('graphit/util');
    
    var FACTORY = {
            node: function(cls, opts, mixin) {
              if (mixin !== undefined) {
                  for (var i = 0; i < mixin.length; i++) {
                      util.injectMixin(cls, mixin[i]);
                  }
              }
              var node = new cls(opts);
              if (opts !== undefined) {
                  if (opts.pool !== undefined) {
                      opts.pool.push(node);
                  }
              }
              if (mixin !== undefined) {
                  for (var i = 0; i < mixin.length; i++) {
                      if ('constructor' in mixin[i]) {
                          mixin[i].call(node);
                      }
                  }
              }
              return node;
            },
    };
    return FACTORY;
});