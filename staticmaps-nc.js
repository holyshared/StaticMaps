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
	},

	setCenter: function(point){
		if (!instanceOf(point, StaticMaps.Point)) {
			point = new StaticMaps.Point(point);
		}
		this._set('_position.center', point);
		return this;
	}

});

var options = {};
['center', 'zoom'].each(function(name){
	var propertyName = '_position.' + name;
	var getterName = 'get' + name.capitalize();
	options[getterName] = function() {
		var value = this._get(propertyName);
		return value;
	};
});

['zoom'].each(function(name){
	var propertyName = '_position.' + name;
	var setterName = 'set' + name.capitalize();
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
/*	if (center) {
		switch(typeOf(center)) {
			case 'string':
				query.push('center=' + encodeURIComponent(center));
				break;
			case 'object':
				query.push('center=' + center.lat + ',' + center.lng);
				break;
		}
	}*/
	if (center) {
		if (center.getValue() !== null) {
			query.push('center=' + center.toString());
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

/*
---
name: StaticMaps.Map

description: The setting of the map is added in StaticMaps and a revokable function is added.

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
  - StaticMaps.Position

provides: [StaticMaps.Map]
...
*/

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
  - StaticMaps.Map

provides: [StaticMaps, StaticMaps.Hooks, StaticMaps.Validater, StaticMaps.Point]
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

/*
---
name: StaticMaps.Marker

description: The marker function is added to StaticMaps.

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

provides: [StaticMaps.Marker]
...
*/

(function($){

var StaticMaps = (this.StaticMaps || {});

StaticMaps.implement({

	options: {
		markers: []
	},

	_markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMaps.Marker)) {
			marker = new StaticMaps.Marker(marker);
		}
		this._markers.push(marker);
		return marker;
	},

	addMarkers: function(markers){
		var addMarkers = [], newMarker = null;
		for (var i = 0; i < markers.length; i++){
			newMarker = this.addMarker(markers[i]);
			if (!newMarker) continue;
			addMarkers.push(newMarker);
		}
		return addMarkers;
	},

	removeMarker: function(marker){
		this._markers.erase(marker);
	},

	removeMarkers: function(markers){
		for (var i = 0; i < this._markers.length; i++){
			this.removeMarker(markers[i]);
		}
	}

});

StaticMaps.Marker = new Class({

	_color: null,
	_size: null,
	_label: null,
	_icon: null,
	_shadow: true,
	_point: null,

	initialize: function(props){
		var properties = props = (props || {});
		this.setProperties(properties);
	},

	_set: function(key, value){
		var vn = StaticMaps.Marker.validaters[key];
		if (StaticMaps.Validater['isValid' + vn.capitalize()](value)) {
			this[key] = value;
		}
	},

	_get: function(key){
		return this[key];
	},

	setProperties: function(props) {
		var method = null, value = null;
		for (var key in props) {
			if (props.hasOwnProperty(key)) {
				method = key.capitalize();
				value = props[key];

				this["set" + method](value);
			}
		}
	},

	getProperties: function() {
		var props = {}, key = null;
		var keys = StaticMaps.Marker.orderKeys;
		for (var i = 0; i < keys.length; i++){
			key = keys[i];
			props[key] = this[key];
		}
		return props;
	},

	setPoint: function(point){
		if (!instanceOf(point, StaticMaps.Point)) {
			point = new StaticMaps.Point(point);
		}
		this._set('_point', point);
		return this;
	},

	toQueryString: function() {
		var query = [], key = null, value = null;
		var orderKeys = StaticMaps.Marker.orderKeys;
		var l = StaticMaps.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case '_point':
					query.push(value.toString());
					break;
				default:
					query.push(key.replace('_', '') + ':' + value);
					break;
			}
		}
		return query.join('|');
	}

});

var methods = {};
['_color', '_size', '_label', '_icon', '_shadow', '_point'].each(function(name){
	var getterName = 'get' + name.replace('_', '').capitalize();
	methods[getterName] = function() {
		var value = this._get(name);
		return value;
	};
});

['_color', '_size', '_label', '_icon', '_shadow'].each(function(name){
	var setterName = 'set' + name.replace('_', '').capitalize();
	methods[setterName] = function() {
		var args = [name].append(Array.from(arguments));
		this._set.apply(this, args);
		return this;
	};
});


StaticMaps.Marker.validaters = {
	_color: 'color',
	_size: 'markerSize',
	_label: 'label',
	_icon: 'icon',
	_shadow: 'boolean',
	_point: 'point'
};

StaticMaps.Marker.implement(methods);

StaticMaps.Marker.orderKeys = ['_color', '_size', '_label', '_icon', '_shadow', '_point'];

StaticMaps.Marker.setDefaults = function(markers) {
	var marker = null, len = markers.length;
	for (var i = 0; len > i; i++ ) {
		this.addMarker(markers[i]);
	}
};

StaticMaps.Marker.factory = function(props) {
	var properties = Object.subset(props || {}, ['color', 'size', 'label', 'icon', 'shadow', 'point']);
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			if (properties[key] == undefined) {
				delete properties[key];
			}
		}
	}
	var marker = new StaticMaps.Marker(properties);
	return marker;
};

StaticMaps.Marker.toQueryString = function(markers) {
	var query = [], markerQuery = [];

	if (markers.length <= 0) return '';

	var markersCopys = Array.clone(markers);
	var marker = markersCopys.shift();

	markerQuery.push(marker.toQueryString());
	for (var i = 0; i < markersCopys.length; i++) {
		marker = markersCopys[i];
		if (marker.getColor() || marker.getLabel() || marker.getSize()) {
			query.push('markers=' + markerQuery.join('|'));
			markerQuery = [];
		}
		markerQuery.push(marker.toQueryString());
	}
	query.push('markers=' + markerQuery.join('|'));
	return query.join('&');
};

StaticMaps.Hooks.registerDefaults('_markers', StaticMaps.Marker.setDefaults);
StaticMaps.Hooks.registerQuery('_markers', StaticMaps.Marker.toQueryString);

}(document.id));

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
