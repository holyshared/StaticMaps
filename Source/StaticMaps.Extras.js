/*
---
name: StaticMaps.Extras

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

provides: [StaticMaps.Point]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.Point = new Class({

	_point: null,

	initialize: function(props){
		if (!props) return;
		this.setPoint(props);
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
		this._point = point;
		return this;
	},

	getPoint: function() {
		return this._point;
	},

	toString: function() {
		var query = '';
		if (typeOf(point) == 'string') {
			query = encodeURIComponent(point);
		} else {
			query = point.lat + ',' + point.lng;
		}
		return query;
	}

});

StaticMaps.Point.factory = function(props) {
};

StaticMaps.Validaters = {

	colors: ['black', 'brown', 'green', 'purple', 'yellow',
        'blue', 'gray', 'orange', 'red', 'white'],

    isValidColor: function(color){
		if (typeOf(color) != 'string') return false;
		if (this.colors.indexOf(color) <= -1
			&& !color.test(/^0x[A-Z0-9]{6}$/)) {
			return false;
		}
		return true;
	},

	isValidPoint: function(point){
		switch(typeOf(point)) {
			case 'object':
				if (typeOf(point.lat) != 'number'
				&& typeOf(point.lng) != 'number') {
					return false;
				}
				break;
			case 'string':
				if (point.length <= 0) {
					return false;
				}
				break;
			default:
				return false;
		}
		return true;
	}

};

}(document.id));