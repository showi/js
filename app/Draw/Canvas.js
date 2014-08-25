define(function (require) {

	var MissingParameterException = require('../Exception/MissingParameter');
	var List = require('../List/Dl/List');
	var Context = require('../Draw/Context');

	function MODULE(width, height, x, y) {
	        this.__MODULE__ = 'Draw/Canvas';
		if (width === undefined) {
			throw new MissingParameterException('width');
		}
		if (height === undefined) {
			throw new MissingParameterException('height');
		}
		this.width =  width;
		this.height = height;
		this.x = (x === undefined)? 0 : x;
		this.y = (y === undefined)? 0 : y;
		this.layers = new List();
		var canvas = this._newContext();
		this.layers.append(canvas);
	};
	
	MODULE.prototype._newContext = function() {
		var elm = document.createElement('canvas');
		elm.width = this.width;
		elm.height = this.height;
		elm = new Context(elm);
		return elm;
	};
	
	MODULE.prototype.getFront = function() {
		this.layers.first;
	};

	MODULE.prototype.getBack = function() {
		this.layers.last;
	};
	
	MODULE.prototype.toString = function() {
		return '<canvas width="' + 
			this.width + 
			'" height="'+ this.height + 
			' x="'+this.x +'" y="'+this.y+'">';
	};

	MODULE.prototype.getContext = function(back) {
		if (back) {
			return this.layers.last.content;
		}
		return this.layers.first.content;
	};

	MODULE.prototype.getElement = function(back) {
		if (back) {
			return this.layers.last.content.getElement();
		}
		return this.layers.first.content.getElement();
	};

	return MODULE;
});