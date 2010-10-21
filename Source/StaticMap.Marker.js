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
		this.set(props);
	},

	set: function(props) {
		for (var key in props) {
			var method = key.capitalize();
			this["set" + method](props[key]);
		}
	},

	setColor: function(color) {
		this.props['color'] = color;
		return this;
	},

	setLabel: function(label) {
		this.props['label'] = label;
		return this;
	},

	setSize: function(size) {
		this.props['size'] = size;
		return this;
	},

	setPoint: function(point) {
		this.props['point'] = point;
		return this;
	},

	toObject: function() {
		return this.props;
	}

});

StaticMap.Marker.factory = function(props) {

	var marker = new StaticMap.Marker(props);
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