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

provides: [StaticMaps, StaticMaps.Hooks]
...
*/

(function($){

var StaticMaps = this.StaticMaps = new Class({

	Implements: [Options],

	options: {},

	_url: 'http://maps.google.com/maps/api/staticmap',

	_sensor: false,

	initialize: function(options){
		this.setOptions(options);
		this._setDefaultValues();
	},

	_set: function(property, value){
		var property = property.split('.');
		var namespace = property.shift();
		var key = property.shift();
		this[namespace][key] = value;
	},

	_get: function(property){
		var property = property.split('.');
		var namespace = property.shift();
		var key = property.shift();
		return this[namespace][key];
	},

	setSensor: function(value) {
		if (!Type.isBoolean(value)) {
			throw new TypeError('The data type is not boolean');
		}
		this._sensor = value;
	},

	getSensor: function() {
		return this._sensor;
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
		url = url + '&sensor=' + this.getSensor();
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


}(document.id));