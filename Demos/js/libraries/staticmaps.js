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

	sensor: false,

	initialize: function(options){
		this.setOptions(options);
		this._setDefaultValues();
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

	_getImage: function(){
		var img = new Element('img', { 'src': this.toQueryString() });
		if (StaticMaps.Map != undefined){
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
		var property = null, setter = null;
		var defaultSetters = StaticMaps.Hooks.getDefaults();
		for (var key in defaultSetters) {
			if (defaultSetters.hasOwnProperty(key)) {
				property = this.options[key];
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
		if (StaticMaps[className] == null || StaticMaps[className] == 'undefind') {
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
		if (typeOf(fn) != 'function') return;
		this.defaults[key] = fn;
	},

	registerQuery: function(key, fn) {
		if (typeOf(fn) != 'function') return;
		this.queries[key] = fn;
	}

};


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
			maptype: null,
			mobile: null,
			language: null
		}
	},

	map: {
		size: null,
		format: null,
		maptype: null,
		mobile: null,
		language: null
	},

	setSize: function(width, height) {
		if (typeOf(width) != 'number'
			|| typeOf(height) != 'number') {
			throw new TypeError('The data type of the size is not a numerical value');
		}
		if (width <= 0 || height <= 0) throw new TypeError('Please make the size the size of 0 or more');

		var size = {
			width: width,
			height: height
		};
		this.map['size'] = size;
		return this;
	},

	setFormat: function(format) {
		if (StaticMaps.Map.formats.indexOf(format) <= -1) {
			throw new TypeError('Png, jpg, and gif, etc. can be specified for an image format');
		}
		this.map['format'] = format;
		return this;
	},

	setMapType: function(maptype) {
		if (StaticMaps.Map.maptypes.indexOf(maptype) <= -1) {
			throw new TypeError('Please specify either roadmap, satellite, terrain or hybrid for a type in the map');
		}
		this.map['maptype'] = maptype;
		return this;
	},

	setMobile: function(mobile) {
		if (typeOf(mobile) != 'boolean') {
			throw new TypeError('The data type is not boolean');
		}
		this.map['mobile'] = mobile;
		return this;
	},

	setLanguage: function(language) {
		if (StaticMaps.Map.languages.indexOf(language) <= -1) {
			throw new TypeError("The specified language doesn't correspond");
		}
		this.map['language'] = language;
		return this;
	},

	getSize: function() {
		return this.map['size'];
	},

	getFormat: function(format) {
		return this.map['format'];
	},

	getMapType: function(maptype) {
		return this.map['maptype'];
	},

	getMobile: function(mobile) {
		return this.map['mobile'];
	},

	getLanguage: function(language) {
		return this.map['language'];
	}

});

StaticMaps.Map = {};

//Formats
StaticMaps.Map.formats = ['png', 'png8', 'png32', 'gif', 'jpg', 'jpg-baseline'];

//Maptypes
StaticMaps.Map.maptypes = ['roadmap', 'satellite', 'terrain', 'hybrid'];

//ISO 639: 2-letter codes
StaticMaps.Map.languages = [
	'aa', 'ab', 'af', 'am', 'ar','as','ay','az','ba','be','bg','bh','bi','bn','bo','br','ca','co','cs','cy','da',
	'de','dz','el','en','eo','es','et','eu','fa','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','ha','hi','hr',
	'hu','hy','ia','ie','ik','in','is','it','iw','ja','ji','jw','ka','kk','kl','km','kn','ko','ks','ku','ky','la',
	'ln','lo','lt','lv','mg','mi','mk','ml','mn','mo','mr','ms','mt','my','na','ne','nl','no','oc','om','or','pa',
	'pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sd','sg','sh','si','sk','sl','sm','sn','so','sq','sr','ss',
	'st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','uk','ur','uz','vi','vo',
	'wo','xh','yo','zh','zu'
];

//The hook that sets an initial value is added. 
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
				case 'maptype':
					this.setMapType(value);
					break;
				default:
					this["set" + method](value);
					break;
			}
		}
	}
};
StaticMaps.Hooks.registerDefaults('map', StaticMaps.Map.setDefaults);

//Method of class of converting two or more map into url query.
StaticMaps.Map.toQueryString = function(map) {
	var query = [], value = null;
	for (var key in map) {
		if (map.hasOwnProperty(key)) {
			value = map[key];
			if (value == null && value == undefined) continue;
			switch (key) {
				case 'size':
					query.push(key + '=' + value.width + 'x' + value.height);
					break;
				default:
					query.push(key + '=' + value);
			}
		}
	}
	return query.join('&');
};

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMaps.Hooks.registerQuery('map', StaticMaps.Map.toQueryString);

}(document.id));

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

	markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMaps.Marker)) {
			marker = new StaticMaps.Marker(marker);
		}
		this['markers'].push(marker);
	},

	removeMarker: function(value){
		var target = value;
		if (typeOf(value) == 'number') {
			if (this['markers'][value]) {
				target = this['markers'][value]; 
			}
		}
		this['markers'].erase(target);
	}

});

StaticMaps.Marker = new Class({

	props: {
		color: null,
		size: null,
		label: null,
	    icon: null,
		shadow: true,
		point: null
	},

	initialize: function(props){
		var properties = props = (props || {});
		this.setProperties(properties);
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

	setColor: function(color) {
		if (typeOf(color) != 'string') throw new TypeError('The color is not a character string');
		if (StaticMaps.Marker.colors.indexOf(color) <= -1
			&& !color.test(/^0x[A-Z0-9]{6}$/)) {
			throw new TypeError('They are not curlers such as 24 bit color or black, brown, and green');
		}
		this.props['color'] = color;
		return this;
	},

	setLabel: function(label) {
		if (typeOf(label) != 'string') throw new TypeError('The label is not a character string');
		if (!label.test(/^[A-Z0-9]{1}$/)) {
			throw new TypeError('It is not one character in the set of {A-Z, 0-9}');
		}
		this.props['label'] = label;
		return this;
	},

	setSize: function(size) {
		if (typeOf(size) != 'string') throw new TypeError('The size is not a character string');
		if (StaticMaps.Marker.sizes.indexOf(size) <= - 1) {
			throw new TypeError('The sizes are not either tiny, mid or small');
		}
		this.props['size'] = size;
		return this;
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
		this.props['point'] = point;
		return this;
	},

	setIcon: function(url) {
		if (typeOf(url) != 'string') throw new TypeError('The url is not a character string');
		if (!url.test(/^(((ht|f)tp(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/)) {
			throw new TypeError('It is not a format of url');
		}
		this.props['icon'] = url;
		return this;
	},

	setShadow: function(value) {
		if (typeOf(value) != 'boolean') {
			throw new TypeError('The data type is not boolean');
		}
		this.props['shadow'] = value;
		return this;
	},

	getProperties: function(props) {
		return this.props;
	},

	getColor: function(color) {
		return this.props['color'];
	},

	getLabel: function(label) {
		return this.props['label'];
	},

	getSize: function(size) {
		return this.props['size'];
	},

	getPoint: function(point) {
		return this.props['point'];
	},

	getIcon: function() {
		return this.props['icon'];
	},

	getShadow: function() {
		return this.props['shadow'];
	},

	toObject: function() {
		var object = {};
		for (var key in this.props) {
			if (this.props.hasOwnProperty(key)) {
				value = this.props[key];
				if (value == null && value == undefined) continue;
				object[key] = value;
			}
		}
		return object;
	},

	toQueryString: function() {
		var query = [];
		var orderKeys = StaticMaps.Marker.orderKeys;
		var l = StaticMaps.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this.props[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case 'point':
					if (typeOf(value) == 'string') {
						query.push(encodeURIComponent(value));
					} else {
						query.push(value.lat + ',' + value.lng);
					}
					break;
				default:
					query.push(key + ':' + value);
					break;
			}
		}
		return query.join('|');
	}

});

//Size of marker
StaticMaps.Marker.sizes = ['tiny', 'mid', 'small']; 

//Color of marker
StaticMaps.Marker.colors = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']; 

StaticMaps.Marker.orderKeys = ['color', 'size', 'label', 'icon', 'shadow', 'point'];

//The hook that sets an initial value is added. 
StaticMaps.Marker.setDefaults = function(markers) {
	var marker = null, len = markers.length;
	for (var i = 0; len > i; i++ ) {
		this.addMarker(markers[i]);
	}
};
StaticMaps.Hooks.registerDefaults('markers', StaticMaps.Marker.setDefaults);

//Method of factory of generating marker
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

//Method of class of converting two or more markers into url query.
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

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMaps.Hooks.registerQuery('markers', StaticMaps.Marker.toQueryString);

}(document.id));
