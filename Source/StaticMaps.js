/*
---
name: StaticMaps

description: It draws in a static map with Static Maps API V2. The acquisition of URL is also possible.

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

provides: [StaticMaps, StaticMaps.Hooks, StaticMaps.Validater, StaticMaps.Point, StaticMaps.Map]
...
*/

(function($){

var StaticMaps = this.StaticMaps = new Class({

	Implements: [Options],

	options: {},

	_validaters: {},

	_url: 'http://maps.google.com/maps/api/staticmap',

	initialize: function(options){
		this.setOptions(options);
		this._setDefaultValues();
	},

	_set: function(property, value){
		var property = property.split('.');
		var ns = property.shift();
		var key = property.shift();

		var vn = this._validaters[ns][key];
		vn = vn.capitalize();

		if (StaticMaps.Validater['isValid' + vn](value)) {
			this[ns][key] = value;
		}
	},

	_get: function(property){
		var property = property.split('.');
		var ns = property.shift();
		var key = property.shift();
		return this[ns][key];
	},

	_getImage: function(){
		var img = new Element('img', { 'src': this.toQueryString() });
		if (StaticMaps.Map !== undefined){
			var size = this.getSize();
			img.setProperties(this.getSize());
		}
		return img;
	},

	renderTo: function(element){
		var img = this._getImage();
		img.inject(element);
	},

	_setDefaultValues: function() {
		var property = null, optionKey = null, setter = null;
		var defaultSetters = StaticMaps.Hooks.getDefaults();
		for (var key in defaultSetters) {
			if (defaultSetters.hasOwnProperty(key)) {
				optionKey = key.replace("_", "");
				property = this.options[optionKey];
				setter = defaultSetters[key].bind(this);
				setter(property);
			}
		}
	},

	toQueryString: function() {
		var query = [];
		var queryConverters = StaticMaps.Hooks.getQueries();
		for (var key in queryConverters) {
			if (queryConverters.hasOwnProperty(key)) {
				var property = this[key]; 
				var converter = queryConverters[key];
				var result = converter(property);
				if (result != '') {
					query.push(result);
				}
			}
		}
		var url = this._url + '?' + query.join('&');
		return url;
	},

	factory: function(type, props){
		var className = type.capitalize();
		if (StaticMaps[className] === null || StaticMaps[className] === 'undefind') {
			throw new TypeError('The class that was able to make it to the instance was not found');
		}
		return StaticMaps[className].factory(props);
	}

});





StaticMaps.Point = new Class({

	_point: null,

	initialize: function(value){
		this.setValue(value || null);
	},

	setValue: function(value){
		if (!StaticMaps.Validater['isValidPoint'](value)) return;
		this._point = value;
	},

	getValue: function(){
		return this._point;
	},

	toString: function(){
		var serialize = null;
		switch(typeOf(this._point)) {
			case 'object':
				serialize = this._point.lat + ',' + this._point.lng;
				break;
			case 'string':
				serialize = encodeURIComponent(this._point);
				break;
			default:
				serialize = null;
		}
		return serialize;
	}

});

StaticMaps.Point.factory = function(value) {
	return new StaticMaps.Point(value);
};

StaticMaps.Hooks = {

	defaults: {},
	queries: {},

	getDefaults: function() {
		return this.defaults;
	},

	getQueries: function() {
		return this.queries;
	},

	registerDefaults: function(key, fn) {
		if (!Type.isFunction(fn)) return;
		this.defaults[key] = fn;
	},

	registerQuery: function(key, fn) {
		if (!Type.isFunction(fn)) return;
		this.queries[key] = fn;
	}

};

StaticMaps.Validater = {

	_markerSizes: ['tiny', 'mid', 'small'],

	_formats: ['png', 'png8', 'png32', 'gif', 'jpg', 'jpg-baseline'],

	_mapTypes: ['roadmap', 'satellite', 'terrain', 'hybrid'],

	_languages: [
		'aa', 'ab', 'af', 'am', 'ar','as','ay','az','ba','be','bg','bh','bi','bn','bo','br','ca','co','cs','cy','da',
		'de','dz','el','en','eo','es','et','eu','fa','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','ha','hi','hr',
		'hu','hy','ia','ie','ik','in','is','it','iw','ja','ji','jw','ka','kk','kl','km','kn','ko','ks','ku','ky','la',
		'ln','lo','lt','lv','mg','mi','mk','ml','mn','mo','mr','ms','mt','my','na','ne','nl','no','oc','om','or','pa',
		'pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sd','sg','sh','si','sk','sl','sm','sn','so','sq','sr','ss',
		'st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','uk','ur','uz','vi','vo',
		'wo','xh','yo','zh','zu'
	],

	_colors: ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white'],

	isValidMapSize: function(size){
		if (!Type.isObject(size)) return false;
		if (!(Type.isNumber(size.width) && Type.isNumber(size.height))
			|| (size.width <= 0 || size.height <= 0)) {
			return false;
		}
		return true;
	},

	isValidMarkerSize: function(value){
		if (this._markerSizes.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	isValidLabel: function(label){
		if (!Type.isString(label) || !label.test(/^[A-Z0-9]{1}$/)) {
			return false;
		}
		return true;
	},

	isValidFormat: function(value){
		if (this._formats.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	isValidMapType: function(value){
		if (this._mapTypes.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	isValidLanguage: function(value){
		if (this._languages.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	isValidColor: function(value){
		if (!Type.isString(value)) return false;
		if (!value.test(/^0x[A-Z0-9]{6}$/) && this._colors.indexOf(value) <= -1) {
			return false;
		}
		return true;
	},

	isValidPoint: function(value){
		if (!instanceOf(value, StaticMaps.Point)) {
			switch (typeOf(value)) {
				case 'object':
					if (!Type.isNumber(value.lat) ||
					!Type.isNumber(value.lng)) {
						return false;
					}
					break;
				case 'string':
					if (value.length <= 0) {
						return false;
					}
					break;
				default:
					return false;
					break;
			}
		}
		return true;
	},

	isValidIcon: function(url){
		if (!Type.isString(url)) return false;
		if (!url.test(/^(((ht|f)tp(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/)) {
			return false;
		}
		return true;
	},

	isValidZoom: function(value){
		if (!Type.isNumber(value)) return false;
		if (value < 0 || value > 21) return false;
		return true;
	},

	isValidBoolean: Type.isBoolean,
	isValidNumber: Type.isNumber

};

}(document.id));


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