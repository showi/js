define(function() {     
    return {
        log : function(msg) {
            console.log(msg);
        },
        error : function(msg) {
            console.error(msg);
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