/*
---
name: StaticMap.Marker

description: 

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
  - StaticMap

provides: [StaticMap.Marker]
...
*/

(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

	markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMap.Marker)) {
			marker = new StaticMap.Marker(marker);
		}
		this['markers'].push(marker);
	}

});

StaticMap.Marker = new Class({

	props: {
		color: null,
		size: null,
		label: null,
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
		if (StaticMap.Marker.colors.indexOf(color) <= -1
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
		if (StaticMap.Marker.sizes.indexOf(size) <= - 1) {
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
		for (var key in this.props) {
			value = this.props[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case 'color':
				case 'label':
				case 'size':
					query.push(key + ':' + value);
					break;
				case 'point':
					if (typeOf(value) == 'string') {
						query.push(value);
					} else {
						query.push(value.lat + ',' + value.lng);
					}
					break;
			}
		}
		return query.join('|');
	}

});

//Size of marker
StaticMap.Marker.sizes = ['tiny', 'mid', 'small']; 

//Color of marker
StaticMap.Marker.colors = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']; 

//Method of factory of generating marker
StaticMap.Marker.factory = function(props) {
	if (typeOf(props) == 'object') new TypeError('The property of the marker is not an object.');
	var properties = Object.subset(props, ['color', 'size', 'label', 'point']);
	for (var key in properties) {
		if (properties[key] == undefined) {
			delete properties[key];
		}
	}
	var marker = new StaticMap.Marker(properties);
	return marker;
};

//Method of class of converting two or more markers into url query.
StaticMap.Marker.toQueryString = function(markers) {
	var query = [], markerQuery = [];
	var marker = markers.shift();

	markerQuery.push(marker.toQueryString());
	for (var i = 0; i < markers.length; i++) {
		marker = markers[i];
		if (marker.getColor() || marker.getLabel() || marker.getSize()) {
			query.push('markers=' + markerQuery.join('|'));
			markerQuery = [];
		}
		markerQuery.push(marker.toQueryString());
	}
	query.push('markers=' + markerQuery.join('|'));
	return query.join('&amp;');
};

//It registers in the [kueri] conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMap.Querys.registerQuery('markers', StaticMap.Marker.toQueryString);

}(document.id));