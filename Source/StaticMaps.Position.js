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

	_validaters: {
		_position: {
			center: 'point',
			zoom: 'zoom'
		}
	}

});

var options = {};
['center', 'zoom'].each(function(name){
	var propertyName = '_position.' + name;
	var getterName = 'get' + name.capitalize();
	var setterName = 'set' + name.capitalize();

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