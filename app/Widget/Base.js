define(function (require) {
	
	jQuery.widget('graphit.baseWidget', {
		options: {},
		_create: function() {
			console.log('Creating custom.widget');
			var elm = this.element;
			elm.addClass('ui-widget');
			var header = jQuery('<div class="header">Header</div>');
			this.option('header', header);
			var content = jQuery('<div class="content">Content</div>');
			this.option('content', content);
			var footer = jQuery('<div class="footer">Footer</div>');
			this.option('footer', footer);
			elm.append(header);
			elm.append(content);
			elm.append(footer);
			this.refresh();
		},
		refresh: function() {
			var elm = this.element;
			elm.width(this.options.width);
			elm.height(this.options.height);
			return this;
		},
//	    _setOption: function( key, value ) {
//	        if ( key === "value" ) {
//	            value = this._constrain( value );
//	        }
//	        this._super( key, value );
//	    },
//	    _setOptions: function( options ) {
//	        this._super( options );
//	        this.refresh();
//	    },
	});
	jQuery.graphit.baseWidget.prototype.content = function(value) {
		if (value === undefined) {
			return this.options.content;
		}
		return this.options.content = value;
	};
	jQuery.graphit.baseWidget.prototype.header = function(value) {
		if (value === undefined) {
			return this.options.header;
		}
		return this.options.header = value;
	};
	function Callable(id, options) {
		console.log('Callable: ' + id);
		var elm = jQuery(id);
		if (!elm) {
			elm = jQuery('<div></div>');
		}
		console.log('Elm: ' + elm);
		elm.baseWidget(options);
		return elm;
	};
	
	return Callable;

//	function Module(id, options) {
//		var elm = jQuery(id);
//		if (!elm) {
//			elm = jQuery('<div></div>');
//		}
//		elm.widget();
//		for (key in options) {
//			if(elm.hasOwnProperty(key)) { continue; }
//			var value = elm[key];
//			try {
//				elm[key](options[key]);
//				log.log('Method called ' + key + '(' + options[key] + ')');
//			} catch(e) {
//				log.error('Cannot set key: ' + key);
//			}	
//		}
////		elm.option(options);
//		this.element = elm;
//	};
//	Module.prototype = Object.create(CBase.prototype);
//    Module.prototype.constructor = new CBase();

//    return Module;
//    
//    Module.prototype.getId = function() {
//    	return this.id;
//    };
//    
//    Module.prototype.setId = function(value) {
//    	this.id = value;
//    	return this;
//    };
//    
//    Module.prototype.setWidth = function(value) {
//    	this.widget.width(value);
//    	return this;
//    };
//
//    Module.prototype.getWidth = function() {
//    	return this.widget.width();
//    };
//
//    Module.prototype.setHeight = function(value) {
//    	this.widget.heigh();
//    	return this;
//    };
//
//    Module.prototype.getHeight = function() {
//    	return this.height;
//    };
//    
//    Module.prototype.setVisible= function(value) {
//    	this.visible = value;
//    	return this;
//    };
//    
//    Module.prototype.getVisible = function() {
//    	return this.visible;
//    };
//
//    Module.prototype.setResizable = function(value) {
//    	this.resizable = value;
//    	return this;
//    };
//    
//    Module.prototype.getResizable = function() {
//    	return this.resizable;
//    };
//
//    Module.prototype.setDraggable = function(value) {
//    	this.draggable = value;
//    	return this;
//    };
//    
//    Module.prototype.getDraggable = function() {
//    	return this.draggable;
//    };
//
//    Module.prototype.attach = function() {
//    	id = this.getId();
//    	log.log('Search document id: ' + id);
//    	var elm = document.getElementById(id);
//    	if (!elm) {
//    		throw new InvalidDocumentIdException(id);
//    	}
//    	elm = jQuery("#" + id);
//       	elm.width(this.getWidth());
//    	elm.height(this.getHeight());
//    	if (this.getResizable()) {
//    		elm.resizable();
//    	}
//    	if (this.getDraggable()) {
//    		elm.draggable({revert: true});
//    	}
//    	if (this.visible) {
//    		elm.show();
//    	} else {
//    		elm.hide();
//    	}
//    };
//
//    return Module;
});