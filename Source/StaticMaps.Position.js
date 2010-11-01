/*
---
name: StaticMaps.Position

description: The function to change the display setting of the map to StaticMaps is added.

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

provides: [StaticMaps.Position]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.implement({

	options: {
		position: {
			center: null,
			zoom: null
		}
	},

	position: {
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
		this.position['center'] = point;
		return this;
	},

	setZoom: function(zoom){
		if (typeOf(zoom) != 'number') {
			throw new TypeError('');
		}
		if (zoom < 0 || zoom > 21) {
			throw new TypeError('');
		}
		this.position['zoom'] = zoom;
	},


	getCenter: function(){
		return this.position['center'];
	},

	getZoom: function(zoom){
		return this.position['zoom'];
	}

});

StaticMaps.Position = {};

//The hook that sets an initial value is added. 
StaticMaps.Position.setDefaults = function(props) {
	var method = null, value = null;
	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			method = key.capitalize();
			value = props[key];
			if (value === null || value === undefined) continue;
			if (props.hasOwnProperty(key)) {
				this["set" + method](value);
			}
		}
	}
};
StaticMaps.Hooks.registerDefaults('position', StaticMaps.Position.setDefaults);


//Method of class of converting two or more positions into url query.
StaticMaps.Position.toQueryString = function(position) {
	var query = [];
	var center = position.center;
	if (center) {
		switch(typeOf(center)) {
			case 'string':
				query.push('center=' + encodeURIComponent(center));
				break;
			case 'object':
				query.push('center=' + center.lat + ',' + center.lng);
				break;
		}
	}

	if (position.zoom) {
		query.push('zoom=' + position.zoom);
	}
	return query.join('&');
};

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMaps.Hooks.registerQuery('position', StaticMaps.Position.toQueryString);

}(document.id));