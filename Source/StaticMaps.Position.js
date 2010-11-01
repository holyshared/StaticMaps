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

	_position: {
		center: null,
		zoom: null
	},

	setCenter: function(point){
		if (!this._isValidPoint(point)) {
			throw new Error('The value of coordinates is an invalid value.');
		}
		this._set('_position.center', point);
		return this;
	},

	setZoom: function(zoom){
		if (!this._isValidZoom(zoom)) {
			throw new Error('The value at the zoom level is not an effective value.');
		}
		this._set('_position.zoom', zoom);
		return this;
	},

	getCenter: function(){
		return this._get('_position.center');
	},

	getZoom: function(){
		return this._get('_position.zoom');
	}

});

StaticMaps.Position = {};

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

StaticMaps.Hooks.registerDefaults('_position', StaticMaps.Position.setDefaults);
StaticMaps.Hooks.registerQuery('_position', StaticMaps.Position.toQueryString);

}(document.id));