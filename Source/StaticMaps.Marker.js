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

	markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMaps.Marker)) {
			marker = new StaticMaps.Marker(marker);
		}
		this['markers'].push(marker);
	},

	removeMarker: function(value){
		var target = value;
		if (typeOf(value) == 'number') {
			if (this['markers'][value]) {
				target = this['markers'][value]; 
			}
		}
		this['markers'].erase(target);
	}

});

StaticMaps.Marker = new Class({

	props: {
		color: null,
		size: null,
		label: null,
	    icon: null,
		shadow: true,
		point: null
	},

	initialize: function(props){
		this.setProperties(props);
	},

	setProperties: function(props) {
		var method = null, value = null;
		for (var key in props) {
			method = key.capitalize();
			value = props[key];
			this["set" + method](value);
		}
	},

	setColor: function(color) {
		if (typeOf(color) != 'string') throw new TypeError('The color is not a character string');
		if (StaticMaps.Marker.colors.indexOf(color) <= -1
			&& !color.test(/^0x[A-Z0-9]{6}$/)) {
			throw new TypeError('They are not curlers such as 24 bit color or black, brown, and green');
		}
		this.props['color'] = color;
		return this;
	},

	setLabel: function(label) {
		if (typeOf(label) != 'string') throw new TypeError('The label is not a character string');
		if (!label.test(/^[A-Z0-9]{1}$/)) {
			throw new TypeError('It is not one character in the set of {A-Z, 0-9}');
		}
		this.props['label'] = label;
		return this;
	},

	setSize: function(size) {
		if (typeOf(size) != 'string') throw new TypeError('The size is not a character string');
		if (StaticMaps.Marker.sizes.indexOf(size) <= - 1) {
			throw new TypeError('The sizes are not either tiny, mid or small');
		}
		this.props['size'] = size;
		return this;
	},

	setPoint: function(point) {
		switch(typeOf(point)) {
			case 'object':
				if (typeOf(point.lat) != 'number'
				&& typeOf(point.lng) != 'number') {
					throw new TypeError('The latitude longitude is not a numerical value');
				}
				break;
			case 'string':
				if (point.length <= 0) {
					throw new TypeError('The name of a place is uncertain');
				}
				break;
			default:
				throw new TypeError('The data type at the position is a character string or not an object');
		}
		this.props['point'] = point;
		return this;
	},

	setIcon: function(url) {
		if (typeOf(url) != 'string') throw new TypeError('The url is not a character string');
		if (!url.test(/^(((ht|f)tp(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/)) {
			throw new TypeError('It is not a format of url');
		}
		this.props['icon'] = url;
		return this;
	},

	setShadow: function(value) {
		if (typeOf(value) != 'boolean') {
			throw new TypeError('The data type is not boolean');
		}
		this.props['shadow'] = value;
		return this;
	},

	getColor: function(color) {
		return this.props['color'];
	},

	getLabel: function(label) {
		return this.props['label'];
	},

	getSize: function(size) {
		return this.props['size'];
	},

	getPoint: function(point) {
		return this.props['point'];
	},

	getIcon: function() {
		return this.props['icon'];
	},

	getShadow: function() {
		return this.props['shadow'];
	},

	toObject: function() {
		var object = {};
		for (var key in this.props) {
			value = this.props[key];
			if (value == null && value == undefined) continue;
			object[key] = value;
		}
		return object;
	},

	toQueryString: function() {
		var query = [];
		var orderKeys = StaticMaps.Marker.orderKeys;
		var l = StaticMaps.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this.props[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case 'point':
					if (typeOf(value) == 'string') {
						query.push(encodeURIComponent(value));
					} else {
						query.push(value.lat + ',' + value.lng);
					}
					break;
				default:
					query.push(key + ':' + value);
					break;
			}
		}
		return query.join('|');
	}

});

//Size of marker
StaticMaps.Marker.sizes = ['tiny', 'mid', 'small']; 

//Color of marker
StaticMaps.Marker.colors = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']; 

StaticMaps.Marker.orderKeys = ['color', 'size', 'label', 'icon', 'shadow', 'point'];

//The hook that sets an initial value is added. 
StaticMaps.Marker.setDefaults = function(markers) {
	var marker = null, len = markers.length;
	for (var i = 0; len > i; i++ ) {
		this.addMarker(markers[i]);
	}
};
StaticMaps.Hooks.registerDefaults('markers', StaticMaps.Marker.setDefaults);

//Method of factory of generating marker
StaticMaps.Marker.factory = function(props) {
	if (typeOf(props) == 'object') new TypeError('The property of the marker is not an object.');
	var properties = Object.subset(props, ['color', 'size', 'label', 'icon', 'shadow', 'point']);
	for (var key in properties) {
		if (properties[key] == undefined) {
			delete properties[key];
		}
	}
	var marker = new StaticMaps.Marker(properties);
	return marker;
};

//Method of class of converting two or more markers into url query.
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

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMaps.Hooks.registerQuery('markers', StaticMaps.Marker.toQueryString);

}(document.id));