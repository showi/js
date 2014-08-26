define(function(require) {
    function Callable(content, prev, next) {
        return {
            prev : prev,
            next : next,
            content : content
        };
    }
    return Callable;
});