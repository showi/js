define(function() {     
    return {
        __MODULE__: 'graphit/log',
        log : function(msg) {
            console.error.apply(console, arguments);
        },
        error : function(msg) {
            var args = ['[-]']
            args = args.concat(arguments);
            console.error.apply(console, args);
        },
        action: function(msg) {
            msg = '%c >> ' + msg;
            console.log(msg, 'background: #444; color: #fff' );
        },
        result: function(msg) {
            console.log('<<', msg);
        },
        title: function(msg) {
            msg = '%c >>> ' + msg + ' <<<';
            console.log(msg, 'background: #222; color: #bada55' );
        }
    };
    
});