define(function(require) {

    if (typeof String.prototype.startsWith != 'function') {
        console.log('Extend String object with startsWith method');
        String.prototype.startsWith = function(str) {
            return this.slice(0, str.length) == str;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        console.log('Extend String object with endsWith method');
        String.prototype.endsWith = function(str) {
            return this.slice(-str.length) == str;
        };
    }

});
