/*
---
name: StaticMaps.Path

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
  - StaticMaps
  - StaticMaps.Map

provides: [StaticMaps.Path]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.implement({

	options: {
		path: {
			weight: null,
			color: null,
			fillColor: null,
			points: []
		}
	},

	_path: {
		weight: null,
		color: null,
		fillColor: null,
		points: []
	},

	setPathWeight: function(weight){
		if (!Type.isNumber(weight)){
			throw new TypeError('');
		}
		this._set('_path.weight', weight);
	},

	setPathColor: function(color){
		if (!this._isValidColor(color)){
			throw new TypeError('');
		}
		this._set('_path.color', color);
	},

	setPathFillColor: function(color){
		if (!this._isValidColor(color)){
			throw new TypeError('');
		}
		this._set('_path.fillColor', color);
	},

	setPathPoints: function(points){
		this._set('_path.points', points);
	},

	addPathPoint: function(point){
		if (Type.isObject(point)) {
			point = new StaticMaps.Point(point);
		}
		var points = this._get('_path.points');
		points.push(point);
		this._set('_path.points', points);
	}

});

StaticMaps.Path = {};

StaticMaps.Path.setDefaults = function(path) {
	var method = null, value = null;
	for (var key in path) {
		value = path[key];
		if (path.hasOwnProperty(key)) {
			method = key.capitalize();
			this['setPath' + method](value);
		}
	}
};

StaticMaps.Path.toQueryString = function(path) {
	var query = [], value = null, point = null;
	for (var key in path){
		value = path[key];
		switch(key) {
			case 'points':
				for (var i = 0; i < value.length; i++) {
					query.push(value[i].toString());
				}
				break;
			default:
				query.push(key + ":" + value);
				break;
		}
	}
	return 'path=' + query.join('|');
};

StaticMaps.Hooks.registerDefaults('_path', StaticMaps.Path.setDefaults);
StaticMaps.Hooks.registerQuery('_path', StaticMaps.Path.toQueryString);

}(document.id));