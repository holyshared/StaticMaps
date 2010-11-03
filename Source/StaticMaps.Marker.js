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
		return marker;
	},

	removeMarker: function(marker){
		this._markers.erase(marker);
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

	_set: function(key, value){
		var vn = StaticMaps.Marker.validaters[key];
		if (StaticMaps.Validater['isValid' + vn.capitalize()](value)) {
			this[key] = value;
		}
	},

	_get: function(key){
		return this[key];
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

	getProperties: function() {
		var props = {}, key = null;
		var keys = StaticMaps.Marker.orderKeys;
		for (var i = 0; i < keys.length; i++){
			key = keys[i];
			props[key] = this[key];
		}
		return props;
	},

	setPoint: function(point){
		if (!instanceOf(point, StaticMaps.Point)) {
			point = new StaticMaps.Point(point);
		}
		this._set('_point', point);
		return this;
	},

	toQueryString: function() {
		var query = [], key = null, value = null;
		var orderKeys = StaticMaps.Marker.orderKeys;
		var l = StaticMaps.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case '_point':
					query.push(value.toString());
/*
					if (Type.isString(value)) {
						query.push(encodeURIComponent(value));
					} else {
						query.push(value.lat + ',' + value.lng);
					}
*/
					break;
				default:
					query.push(key.replace('_', '') + ':' + value);
					break;
			}
		}
		return query.join('|');
	}

});

var methods = {};
['_color', '_size', '_label', '_icon', '_shadow', '_point'].each(function(name){
	var getterName = 'get' + name.replace('_', '').capitalize();
	methods[getterName] = function() {
		var value = this._get(name);
		return value;
	};
});

['_color', '_size', '_label', '_icon', '_shadow'].each(function(name){
	var setterName = 'set' + name.replace('_', '').capitalize();
	methods[setterName] = function() {
		var args = [name].append(Array.from(arguments));
		this._set.apply(this, args);
		return this;
	};
});


StaticMaps.Marker.validaters = {
	_color: 'color',
	_size: 'markerSize',
	_label: 'label',
	_icon: 'icon',
	_shadow: 'boolean',
	_point: 'point'
};

StaticMaps.Marker.implement(methods);

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