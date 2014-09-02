define(function(require) {
    
    require('graphit/tree/node/element');
    require('graphit/tree/node/primitive');
    var ns = require('graphit/global');
    
    var FACTORY = {
            node: function(name, opts) {
              console.log('Factory', name, opts);
              if (!(name in ns.tree.node)) {
                  throw 'Node not found in _namespace_.node: ' + name;
              }
              var node = new ns.tree.node[name](opts);
              if (opts !== undefined) {
                  if (opts.pool !== undefined) {
                      opts.pool.push(node);
                  }
              }
              return node;
            },
    };
    return FACTORY;
});