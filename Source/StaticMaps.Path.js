/*
---
name: StaticMaps.Path

description: The function to draw to StaticMaps in passing is added.

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

	_validaters: {
		_path: {
			weight: 'number',
			color: 'color',
			fillColor: 'color'
		}
	},

	addPathPoint: function(point){
		if (!instanceOf(point, StaticMaps.Point)) {
			if (!StaticMaps.Validater['isValidPoint'](point)) {
				return;
			}
			point = new StaticMaps.Point(point);
		}
		var points = this._get('_path.points');
		points.push(point);
		return point;
	},

	addPathPoints: function(points){
		var addPoints = [], newPoint = null;
		for (var i = 0; i < points.length; i++){
			newPoint = this.addPathPoint(points[i]);
			if (!newPoint) continue;
			addPoints.push(newPoint);
		}
		return addPoints;
	},

	removePathPoint: function(point){
		var points = this._get('_path.points');
		points.erase(point);
	},

	removePathPoints: function(points){
		points = points || this._get('_path.points');
		for (var i = 0; i < points.length; i++){
			this.removePathPoint(points[i]);
		}
	}

});

var options = {};
['weight', 'color', 'fillColor'].each(function(name){
	var propertyName = '_path.' + name;
	var getterName = 'getPath' + name.capitalize();
	var setterName = 'setPath' + name.capitalize();

	options[getterName] = function() {
		var value = this._get(propertyName);
		return value;
	};

	options[setterName] = function() {
		var args = [propertyName].append(Array.from(arguments));
		this._set.apply(this, args);
		return this;
	};

});
StaticMaps.implement(options);

StaticMaps.Path = {};

StaticMaps.Path.orderKeys = ['weight', 'color', 'fillColor', 'points'];

StaticMaps.Path.setDefaults = function(path) {
	var method = null, value = null;
	for (var key in path) {
		value = path[key];
		if (path.hasOwnProperty(key)) {
			method = key.capitalize();
			switch(key) {
				case 'points':
					this.addPathPoints(value);
					break;
				default:
					this['setPath' + method](value);
			}
		}
	}
};

StaticMaps.Path.toQueryString = function(path) {
	var query = [], key = null, value = null;
	var orderKeys = StaticMaps.Path.orderKeys;
	var l = orderKeys.length;
	for (var i = 0; i < l; i++) {
		key = orderKeys[i];
		value = path[key];
		if (value == null && value == undefined) continue;
		switch(key) {
			case 'points':
				for (var j = 0; j < value.length; j++) {
					query.push(value[j].toString());
				}
				break;
			default:
				query.push(key.toLowerCase() + ":" + value);
				break;
		}
	}
	return 'path=' + query.join('|');
};

StaticMaps.Hooks.registerDefaults('_path', StaticMaps.Path.setDefaults);
StaticMaps.Hooks.registerQuery('_path', StaticMaps.Path.toQueryString);

}(document.id));