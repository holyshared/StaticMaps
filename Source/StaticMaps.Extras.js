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

provides: [StaticMaps.Point, StaticMaps.Validater]
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



StaticMaps.Validater = new Class({

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

	_isValidMapSize: function(width, height){
		if (!(Type.isNumber(width) && Type.isNumber(height))
			|| (width <= 0 || height <= 0)) {
			return false;
		}
		return true;
	},

	_isValidMarkerSize: function(value){
		if (this._markerSizes.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	_isValidLabel: function(label){
		if (!Type.isString(label) || !label.test(/^[A-Z0-9]{1}$/)) {
			return false;
		}
		return true;
	},

	_isValidFormat: function(value){
		if (this._formats.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	_isValidMapType: function(value){
		if (this._mapTypes.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	_isValidLanguage: function(value){
		if (this._languages.indexOf(value) <= -1 ) {
			return false;
		}
		return true;
	},

	_isValidColor: function(value){
		if (!Type.isString(value)) return false;
		if (!value.test(/^0x[A-Z0-9]{6}$/) && this._colors.indexOf(value) <= -1) {
			return false;
		}
		return true;
	},

	_isValidPoint: function(value){
		switch(typeOf(value)) {
			case 'object':
				if (!Type.isNumber(value.lat)
				|| !Type.isNumber(value.lng)) {
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
		return true;
	},

	_isValidIcon: function(url){
		if (!Type.isString(url)) return false;
		if (!url.test(/^(((ht|f)tp(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/)) {
			return false;
		}
		return true;
	},

	_isValidZoom: function(value){
		if (!Type.isNumber(value)) return false;
		if (value < 0 || value > 21) return false;
		return true;
	}

});

StaticMaps.implement(new StaticMaps.Validater());

}(document.id));