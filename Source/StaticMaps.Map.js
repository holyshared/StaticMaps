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
  - StaticMaps/StaticMaps
  - StaticMaps/StaticMaps.Position

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

//Method of class of converting two or more map into url query.
StaticMaps.Map.toQueryString = function(map) {
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
StaticMaps.Querys.registerQuery('map', StaticMaps.Map.toQueryString);

}(document.id));