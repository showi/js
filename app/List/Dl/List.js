define(function (require) {
	
	var elementFactory = require('./elementFactory');
	
	function Module(parameters) {
		this.first = null;
		this.last = null;
		this.length = 0;
	};

	Module.prototype.foreach = function (callback, reverse) {
		if (reverse === undefined) {
			var current = this.first;
			while (current != null) {
				callback(current);
				current = current.next;
			}
		} else {
			var current = this.last;
			while (current != null) {
				callback(current);
				current = current.prev;
			}			
		}
	};

	Module.prototype.insert = function (content) {
		var elm = elementFactory(content, null, this.first);
		if (this.first === null) {
			this.first = elm;
			this.last = elm;
		} else {
			this.first.prev = elm;
			this.first = elm;
		}
		this.length += 1;
		return elm;
	};

	Module.prototype.append = function(content) {
		if (this.first === null) {
			return this.insert(content);
		}
		var elm = elementFactory(content, this.last, null);
		this.last.next = elm;
		this.last = elm;
		this.length += 1;
		return elm;
	};
	
	Module.prototype.isEmpty = function() {
		if (this.next === this.prev === null) {
			return true;
		}
		return false;
	};

	Module.prototype.remove = function(item) {
		if (item === null) {
			return null;
		}
		if (item == this.first && item == this.last) {
			this.first = this.last = null;
			this.length = 0;
		} else if (item == this.first) {
			item.next.prev = null;
			this.first = item.next;
			this.length -= 1;
		} else if (item == this.last) {
			item.prev.next = null;
			this.last = item.prev;
			this.length -= 1;
		}
		return item;
	};
	
	Module.prototype.pop = function() {
		return this.remove(this.first);
	};

    return Module;
});