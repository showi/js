define(function(require) {
    /* Creating global namespace */
    var _ns_ = 'graphit';
    /* Testing existence of namespace */
    if (_ns_ in window) { /* Already defined */
        console.log('>>> Global namespace already defined');
        return window[_ns_];
    }
    /* Extending javascript object */
    require('graphit/extend/string');
    require('graphit/extend/math');

    /* injecting our base data */
    window[_ns_] = {
        __VERSION__ : '0.0.1',
        __NAMESPACE__: _ns_,
        __UID__: 0,
        tool: null,
        util: null,
        shape: null,
        math: {},
        enum: {},
        genuid: function () {
            return this.__UID__++;
        },
        tree: {
            node: [],
        },
        test: {}
    };
    console.log('>>> Namespace', _ns_, window[_ns_]);
    return window[_ns_];
});