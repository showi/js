define(function (require) {

	var print = require('print');
	var util = require('./util');
	var MissingMethodException = require('./Exception/MissingMethod');

	var Module = function(parameters, options) {
		this.objid = util.genId();
		if(parameters != null) {
			this.parseParameters(parameters);
		}
	};
	
	Module.prototype.parseParameters = function(parameters) {
		print('Parsing parameters: ' + parameters);
		for(var key in parameters) {
			if(!parameters.hasOwnProperty(key)) { continue; }
			var fl = util.ucFirst(key);
			var setMethodName = 'set' + fl;
			if (!(setMethodName in this)) {
				throw new MissingMethodException(setMethodName);
			}
			var getMethodName = 'get' + fl;
			if (!(getMethodName in this)) {
				throw new MissingMethodException(getMethodName);
			}
			this[setMethodName](parameters[key]);
		}
	};

	Module.prototype.toString = function() {
		var s = '<'  + this.__NAME__ + ":\n";
		for(var key in this) {
			if(!this.hasOwnProperty(key)) { continue; }
			if(!util.isFunction(this[key])) {
				s += ' - ' + key + ': ' + this[key] + "\n";
			} else {
				//s += ' - ' + key + ": function...\n";
			}
		}
		s += ">\n";
		return s;
	};

    return Module;
});