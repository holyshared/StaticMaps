/*
---
name: StaticMap

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

provides: [StaticMap, StaticMap.Querys]
...
*/

(function($){

var StaticMap = this.StaticMap = new Class({

	Implements: [Options],

	options: {},

	url: 'http://maps.google.com/maps/api/staticmap',

	sensor: false,

	initialize: function(options){
		this.setOptions(options);
		var op = this.options;
		for (var key in op) {
			this[key] = op[key];
		}
	},

	setSensor: function(value) {
		if (typeOf(value) != 'boolean') {
			throw new TypeError('The data type is not boolean');
		}
		this.sensor = value;
	},

	getSensor: function() {
		return this.sensor;
	},

	getImage: function(){
		var img = new Element('img', { 'src': this.toQueryString() });
		if (StaticMap.Map != undefined){
			var size = this.getSize();
			img.setProperties(this.getSize());
		}
		return img;
	},

	renderTo: function(element){
		var img = this.getImage();
		img.inject(element);
	},

	toQueryString: function() {
		var query = [];
		var queryConverters = StaticMap.Querys.getQueries();
		for (var key in queryConverters) {
			var property = this[key]; 
			var converter = queryConverters[key];
			query.push(converter(property));
		}
		var url = this.url + '?' + query.join('&');
		url = url + '&sensor=' + this.getSensor();
		return url;
	},

	factory: function(type, props){
		var className = type.capitalize();
		if (StaticMap[className] == null || StaticMap[className] == 'undefind') {
			throw new TypeError('The class that was able to make it to the instance was not found');
		}
		return StaticMap[className].factory(props);
	}

});

StaticMap.Querys = {

	queries: {},

	getQueries: function() {
		return this.queries;
	},

	registerQuery: function(key, fn) {
		this.queries[key] = fn;
	}

};

}(document.id));