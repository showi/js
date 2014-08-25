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
        __NAMESPACE__ : 'graphit',
        __VERSION__ : '0.0.1',
        context : null,
    };
    console.log('> Global', window[NAMESPACE]);
    return window[NAMESPACE];
});