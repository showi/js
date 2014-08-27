define(function (require) {

	function Module(message) {
		this.name = 'InvalidNamespace';
		this.message = message;
	};
	
	Module.prototype = new Error();
    Module.prototype.constructor = Module;

    return Module;
});