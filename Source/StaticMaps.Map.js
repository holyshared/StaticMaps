/*
---
name: StaticMaps.Map

description: The setting of the map is added in StaticMaps and a revokable function is added.

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
  - StaticMaps.Position

provides: [StaticMaps.Map]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.implement({

	options: {
		map: {
			size: {
				width: 600,
				height: 600
			},
			format: null,
			mapType: null,
			mobile: null,
			language: null,
			sensor: false
		}
	},

	_map: {
		size: null,
		format: null,
		mapType: null,
		mobile: null,
		language: null,
		sensor: false
	},

	_validaters: {
		_map: {
			size: 'mapSize',
			format: 'format',
			mapType: 'mapType',
			mobile: 'boolean',
			language: 'language',
			sensor: 'boolean'
		}
	},

	setSize: function(width, height) {
		var size = { width: width, height: height };
		this._set('_map.size', size);
		return this;
	}

});

var options = {};
['size', 'format', 'mapType', 'mobile', 'language', 'sensor'].each(function(name){
	var propertyName = '_map.' + name;
	var getterName = 'get' + name.capitalize();
	options[getterName] = function() {
		var value = this._get(propertyName);
		return value;
	};
});

['format', 'mapType', 'mobile', 'language', 'sensor'].each(function(name){
	var propertyName = '_map.' + name;
	var setterName = 'set' + name.capitalize();
	options[setterName] = function() {
		var args = [propertyName].append(Array.from(arguments));
		this._set.apply(this, args);
		return this;
	};
});

StaticMaps.implement(options);

StaticMaps.Map = {};

StaticMaps.Map.setDefaults = function(props) {
	var method = null, value = null;
	for (var key in props) {
		method = key.capitalize();
		value = props[key];
		if (value === null || value === undefined) continue;
		if (props.hasOwnProperty(key)) {
			switch (key) {
				case 'size':
					this.setSize(value.width, value.height);
					break;
				case 'mapType':
					this.setMapType(value);
					break;
				default:
					this["set" + method](value);
					break;
			}
		}
	}
};

StaticMaps.Map.toQueryString = function(map) {
	var query = [], value = null, queryKey = null;
	for (var key in map) {
		if (map.hasOwnProperty(key)) {
			queryValue = map[key];
			queryKey = key.toLowerCase();
			if (queryValue == null && queryValue == undefined) continue;
			switch (key) {
				case 'size':
					query.push(queryKey + '=' + queryValue.width + 'x' + queryValue.height);
					break;
				default:
					query.push(queryKey + '=' + queryValue);
			}
		}
	}
	return query.join('&');
};

StaticMaps.Hooks.registerDefaults('_map', StaticMaps.Map.setDefaults);
StaticMaps.Hooks.registerQuery('_map', StaticMaps.Map.toQueryString);

}(document.id));