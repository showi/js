define(function(require) {
    return {
        log: function(cls, fn){
            window.console.log('Extending <<', cls, '>>', fn);
        }
    };
});