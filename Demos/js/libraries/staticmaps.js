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




/*
---
name: StaticMap.Map

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
  - StaticMap/StaticMap
  - StaticMap/StaticMap.Position

provides: [StaticMap.Map]
...
*/

(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

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
		if (StaticMap.Map.formats.indexOf(format) <= -1) {
			throw new TypeError('Png, jpg, and gif, etc. can be specified for an image format');
		}
		this.map['format'] = format;
		return this;
	},

	setMapType: function(maptype) {
		if (StaticMap.Map.maptypes.indexOf(maptype) <= -1) {
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
		if (StaticMap.Map.languages.indexOf(language) <= -1) {
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

StaticMap.Map = {};

//Formats
StaticMap.Map.formats = ['png', 'png8', 'png32', 'gif', 'jpg', 'jpg-baseline'];

//Maptypes
StaticMap.Map.maptypes = ['roadmap', 'satellite', 'terrain', 'hybrid'];

//ISO 639: 2-letter codes
StaticMap.Map.languages = [
	'aa', 'ab', 'af', 'am', 'ar','as','ay','az','ba','be','bg','bh','bi','bn','bo','br','ca','co','cs','cy','da',
	'de','dz','el','en','eo','es','et','eu','fa','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','ha','hi','hr',
	'hu','hy','ia','ie','ik','in','is','it','iw','ja','ji','jw','ka','kk','kl','km','kn','ko','ks','ku','ky','la',
	'ln','lo','lt','lv','mg','mi','mk','ml','mn','mo','mr','ms','mt','my','na','ne','nl','no','oc','om','or','pa',
	'pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sd','sg','sh','si','sk','sl','sm','sn','so','sq','sr','ss',
	'st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','uk','ur','uz','vi','vo',
	'wo','xh','yo','zh','zu'
];

//Method of class of converting two or more map into url query.
StaticMap.Map.toQueryString = function(map) {
	var query = [], value = null;
	for (var key in map) {
		value = map[key];
		if (value == null && value == undefined) continue;
		switch(key) {
			case 'size':
				query.push(key + '=' + value.width + 'x' + value.height);
				break;
			default:
				query.push(key + '=' + value);
		}
	}
	return query.join('&');
};

//It registers in the query conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMap.Querys.registerQuery('map', StaticMap.Map.toQueryString);

}(document.id));


/*
---
name: StaticMap.Position

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
  - StaticMap/StaticMap
  - StaticMap/StaticMap.Map

provides: [StaticMap.Position]
...
*/

(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

	options: {
		positions: {
			center: null,
			zoom: null
		}
	},

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
				query.push('center=' + encodeURIComponent(center));
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


/*
---
name: StaticMap.Marker

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
  - StaticMap
  - StaticMap.Map

provides: [StaticMap.Marker]
...
*/

(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

	options: {
		markers: []
	},

	markers: [],

	addMarker: function(marker){
		if (!instanceOf(marker, StaticMap.Marker)) {
			marker = new StaticMap.Marker(marker);
		}
		this['markers'].push(marker);
	}

});

StaticMap.Marker = new Class({

	props: {
		color: null,
		size: null,
		label: null,
		point: null
	},

	initialize: function(props){
		this.setProperties(props);
	},

	setProperties: function(props) {
		var method = null, value = null;
		for (var key in props) {
			method = key.capitalize();
			value = props[key];
			this["set" + method](value);
		}
	},

	setColor: function(color) {
		if (typeOf(color) != 'string') throw new TypeError('The color is not a character string');
		if (StaticMap.Marker.colors.indexOf(color) <= -1
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
		if (StaticMap.Marker.sizes.indexOf(size) <= - 1) {
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

	toObject: function() {
		var object = {};
		for (var key in this.props) {
			value = this.props[key];
			if (value == null && value == undefined) continue;
			object[key] = value;
		}
		return object;
	},

	toQueryString: function() {
		var query = [];
		var orderKeys = StaticMap.Marker.orderKeys;
		var l = StaticMap.Marker.orderKeys.length;
		for (var i = 0; i < l; i++) {
			key = orderKeys[i];
			value = this.props[key];
			if (value == null && value == undefined) continue;
			switch(key) {
				case 'color':
				case 'label':
				case 'size':
					query.push(key + ':' + value);
					break;
				case 'point':
					if (typeOf(value) == 'string') {
						query.push(encodeURIComponent(value));
					} else {
						query.push(value.lat + ',' + value.lng);
					}
					break;
			}
		}
		return query.join('|');
	}

});

//Size of marker
StaticMap.Marker.sizes = ['tiny', 'mid', 'small']; 

//Color of marker
StaticMap.Marker.colors = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']; 

StaticMap.Marker.orderKeys = ['color', 'size', 'label', 'point'];

//Method of factory of generating marker
StaticMap.Marker.factory = function(props) {
	if (typeOf(props) == 'object') new TypeError('The property of the marker is not an object.');
	var properties = Object.subset(props, ['color', 'size', 'label', 'point']);
	for (var key in properties) {
		if (properties[key] == undefined) {
			delete properties[key];
		}
	}
	var marker = new StaticMap.Marker(properties);
	return marker;
};

//Method of class of converting two or more markers into url query.
StaticMap.Marker.toQueryString = function(markers) {
	var query = [], markerQuery = [];

	var markersCopys = Array.clone(markers);
	if (markersCopys.length > 0) {
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
	}
	return query.join('&');
};

//It registers in the [kueri] conversion processing of StaticMap.
//When the toQueryString method of StaticMap is called, this method is executed.
StaticMap.Querys.registerQuery('markers', StaticMap.Marker.toQueryString);

}(document.id));