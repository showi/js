define(function(require) {
    /*
     * Creating global namespace
     */
    var NAMESPACE = 'graphit';
    if (NAMESPACE in window) { /* Already defined */
        console.log('>>> Global namespace already defined');
        return window[NAMESPACE];
    }
    console.log('>>> Creating global namespace');
    window[NAMESPACE] = {
        __MODULE__ : 'graphit',
        __VERSION__ : '0.0.1',
        tool: null,
        util: null,
        shape: null,
    };
    console.log('> graphit', window[NAMESPACE]);
    return window[NAMESPACE];
});