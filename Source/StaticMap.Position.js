/*
---
name: StaticMap.Position

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

provides: [StaticMap.Position]
...
*/

(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

	positions: {
		center: null,
		zoom: null
	},

	setCenter: function(point){
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
		this.positions['center'] = point;
		return this;
	},

	setZoom: function(zoom){
		if (typeOf(zoom) != 'number') {
			throw new TypeError('');
		}
		if (zoom < 0 || zoom > 21) {
			throw new TypeError('');
		}
		this.positions['zoom'] = zoom;
	},


	getCenter: function(){
		return this.positions['center'];
	},

	getZoom: function(zoom){
		return this.positions['zoom'];
	}

});

StaticMap.Position = {};

//Method of class of converting two or more positions into url query.
StaticMap.Position.toQueryString = function(positions) {
	var query = [];
	var center = positions.center;
	if (center) {
		switch(typeOf(center)) {
			case 'string':
				query.push('center=' + center);
				break;
			case 'object':
				query.push('center=' + center.lat + ',' + center.lng);
				break;
		}
	}

	if (positions.zoom) {
		query.push('zoom=' + positions.zoom);
	}
	return query.join('&');
};

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMap.Querys.registerQuery('positions', StaticMap.Position.toQueryString);

}(document.id));