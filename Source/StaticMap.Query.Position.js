(function($){

var StaticMap = (this.StaticMap || {});
StaticMap.Query = (this.StaticMap.Query || {});

StaticMap.registerQuery('position', 'Query.Position');

StaticMap.Query.Position = new Class({

	Extends: StaticMap.Query,

	options: {
		center: null,
		zoom: 15
	},

	initialize: function(options){
		this.setOptions(options);
	},

	validate: function(){
		var options = this.options;

		if (typeOf(options.center) == 'object') {
			if (typeOf(options.center.lat) != 'number'
			|| typeOf(options.center.lng) != 'number' ) {
				return false;
			};
		} else {
			if (typeOf(options.center) != 'string'
			|| options.center == '') {
				return false;
			};
		};

		if ((typeOf(options.zoom) != 'number')
		|| (options.zoom < 0 || options.zoom > 21)) {
			return false;
		};
		return true;
	},

	toQueryString: function(){
		var query = {}, value = null, options = this.options;
		for (var key in options) {
			value = options[key];
			switch(key) {
				case 'center':
					query[key] = (typeOf(value) == 'object') ? value.lat + ',' + value.lng : value;
					break;
				case 'zoom':
					query[key] = value;
					break;
			}
		}
		return Object.toQueryString(query);
	}

})

}(document.id))