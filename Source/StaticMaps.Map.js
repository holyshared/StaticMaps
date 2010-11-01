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
			maptype: null,
			mobile: null,
			language: null
		}
	},

	_map: {
		size: null,
		format: null,
		maptype: null,
		mobile: null,
		language: null
	},

	setSize: function(width, height) {
		if (!this._isValidMapSize(width, height)) {
			throw new Error('The size is an invalid size.');
		}
		var size = { width: width, height: height };
		this._set('_map.size', size);
		return this;
	},

	setFormat: function(format) {
		if (!this._isValidFormat(format)) {
			throw new Error('Png, jpg, and gif, etc. can be specified for an image format');
		}
		this._set('_map.format', format);
		return this;
	},

	setMapType: function(maptype) {
		if (!this._isValidMapType(maptype)) {
			throw new Error('Please specify either roadmap, satellite, terrain or hybrid for a type in the map');
		}
		this._set('_map.maptype', maptype);
		return this;
	},

	setMobile: function(mobile) {
		if (!Type.isBoolean(mobile)) {
			throw new Error('The data type is not boolean');
		}
		this._set('_map.mobile', mobile);
		return this;
	},

	setLanguage: function(language) {
		if (!this._isValidLanguage(language)) {
			throw new Error("The specified language doesn't correspond");
		}
		this._set('_map.language', language);
		return this;
	},

	getSize: function() {
		return this._get('_map.size');
	},

	getFormat: function() {
		return this._get('_map.format');
	},

	getMapType: function() {
		return this._get('_map.maptype');
	},

	getMobile: function() {
		return this._get('_map.mobile');
	},

	getLanguage: function() {
		return this._get('_map.language');
	}

});

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
				case 'maptype':
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
	var query = [], value = null;
	for (var key in map) {
		if (map.hasOwnProperty(key)) {
			value = map[key];
			if (value == null && value == undefined) continue;
			switch (key) {
				case 'size':
					query.push(key + '=' + value.width + 'x' + value.height);
					break;
				default:
					query.push(key + '=' + value);
			}
		}
	}
	return query.join('&');
};

StaticMaps.Hooks.registerDefaults('_map', StaticMaps.Map.setDefaults);
StaticMaps.Hooks.registerQuery('_map', StaticMaps.Map.toQueryString);

}(document.id));