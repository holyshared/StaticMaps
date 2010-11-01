/*
---
name: StaticMaps.Marker

description: The marker function is added to StaticMaps.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class
  - Core/Class.Extras
  - Core/Element
  - StaticMaps
  - StaticMaps.Map

provides: [StaticMaps.Marker]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.implement({

	options: {
		markers: []
	},

	_markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMaps.Marker)) {
			marker = new StaticMaps.Marker(marker);
		}
		this._markers.push(marker);
	},

	removeMarker: function(value){
		var target = value;
		if (Type.isNumber(value)) {
			if (this._markers[value]) {
				target = this._markers[value]; 
			}
		}
		this._markers.erase(target);
	}

});

StaticMaps.Marker = new Class({

	_color: null,
	_size: null,
	_label: null,
	_icon: null,
	_shadow: true,
	_point: null,

	initialize: function(props){
		var properties = props = (props || {});
		this.setProperties(properties);
	},

	setProperties: function(props) {
		var method = null, value = null;
		for (var key in props) {
			if (props.hasOwnProperty(key)) {
				method = key.capitalize();
				value = props[key];
				this["set" + method](value);
			}
		}
	},

	setColor: function(color) {
		if (!this._isValidColor(color)) {
			throw new Error('They are not curlers such as 24 bit color or black, brown, and green');
		}
		this._color = color;
		return this;
	},

	setLabel: function(label) {
		if (!this._isValidLabel(label)) {
			throw new Error('It is not one character in the set of {A-Z, 0-9}');
		}
		this._label = label;
		return this;
	},

	setSize: function(size) {
		if (!this._isValidMarkerSize(size)) {
			throw new Error('The sizes are not either tiny, mid or small');
		}
		this._size = size;
		return this;
	},

	setPoint: function(point) {
		if (!this._isValidPoint(point)) {
			throw new Error('The coordinates position is invalid');
		}
		this._point = point;
		return this;
	},

	setIcon: function(url) {
		if (!this._isValidIcon(url)) {
			throw new Error('It is invalid icon URL');
		}
		this._icon = url;
		return this;
	},

	setShadow: function(value) {
		if (!Type.isBoolean(value)) {
			throw new TypeError('The data type is not boolean');
		}
		this._shadow = value;
		return this;
	},

	getProperties: function() {
		var props = {}, key = null;
		var keys = StaticMaps.Marker.orderKeys;
		for (var i = 0; i < keys.length; i++){
			key = keys[i];
			props[key] = this[key];
		}
		return props;
	},

	getColor: function() {
		return this._color;
	},

	getLabel: function() {
		return this._label;
	},

	getSize: function() {
		return this._size;
	},

	getPoint: function() {
		return this._point;
	},

	getIcon: function() {
		return this._icon;
	},

	getShadow: function() {
		return this._shadow;
	},
/*
	toObject: function() {
		var object = {};
		for (var key in this.props) {
			if (this.props.hasOwnProperty(key)) {
				value = this.props[key];
				if (value == null && value == undefined) continue;
				object[key] = value;
			}
		}
		return object;
	},
*/
	toQueryString: function() {
		var query = [];
		var orderKeys = StaticMaps.Marker.orderKeys;
		var l = StaticMaps.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case '_point':
					if (Type.isString(value)) {
						query.push(encodeURIComponent(value));
					} else {
						query.push(value.lat + ',' + value.lng);
					}
					break;
				default:
					query.push(key.replace('_', '') + ':' + value);
					break;
			}
		}
		return query.join('|');
	}

});

StaticMaps.Marker.implement(new StaticMaps.Validater());

StaticMaps.Marker.orderKeys = ['_color', '_size', '_label', '_icon', '_shadow', '_point'];

StaticMaps.Marker.setDefaults = function(markers) {
	var marker = null, len = markers.length;
	for (var i = 0; len > i; i++ ) {
		this.addMarker(markers[i]);
	}
};

StaticMaps.Marker.factory = function(props) {
	var properties = Object.subset(props || {}, ['color', 'size', 'label', 'icon', 'shadow', 'point']);
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			if (properties[key] == undefined) {
				delete properties[key];
			}
		}
	}
	var marker = new StaticMaps.Marker(properties);
	return marker;
};

StaticMaps.Marker.toQueryString = function(markers) {
	var query = [], markerQuery = [];

	if (markers.length <= 0) return '';

	var markersCopys = Array.clone(markers);
	var marker = markersCopys.shift();

	markerQuery.push(marker.toQueryString());
	for (var i = 0; i < markersCopys.length; i++) {
		marker = markersCopys[i];
		if (marker.getColor() || marker.getLabel() || marker.getSize()) {
			query.push('markers=' + markerQuery.join('|'));
			markerQuery = [];
		}
		markerQuery.push(marker.toQueryString());
	}
	query.push('markers=' + markerQuery.join('|'));
	return query.join('&');
};

StaticMaps.Hooks.registerDefaults('_markers', StaticMaps.Marker.setDefaults);
StaticMaps.Hooks.registerQuery('_markers', StaticMaps.Marker.toQueryString);

}(document.id));