(function($){

var StaticMap = (this.StaticMap || {});

StaticMap.implement({

	markers: [],

	addMarker: function(marker){
		var keyValues = marker;
		if (instanceOf(marker, StaticMap.Marker)) {
			keyValues = marker.toObject();
		}
		this['markers'].push(keyValues);
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
		return this.props;
	}

});

StaticMap.Marker.sizes = ['tiny', 'mid', 'small']; 
StaticMap.Marker.colors = ['black', 'brown', 'green', 'purple', 'yellow', 'blue', 'gray', 'orange', 'red', 'white']; 

StaticMap.Marker.factory = function(props) {
	if (typeOf(props) == 'object') new TypeError('The property of the marker is not an object.');
	var properties = Object.subset(props, ['color', 'size', 'label', 'point']);
	for (var key in properties) {
		if (properties[key] == undefined) {
			delete properties[key];
		}
	}
console.log(properties);
	var marker = new StaticMap.Marker(properties);
	return marker;
};

StaticMap.Marker.toQueryString = function(markers) {
	var color = label = size = null;
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		for (var key in marker) {
			var value = marker[key];
			switch(key) {
				case 'color': color = (value) ? value : color; break;
				case 'label': label = (value) ? value : label; break;
				case 'size': size = (value) ? value : size; break;
				case 'point':
					if (typeOf(value) == 'string') {
						a.push(value);
					} else {
						a.push(value.lat + ',' + value.lng);
					}
					break;
			}
		}
	}
};

}(document.id));