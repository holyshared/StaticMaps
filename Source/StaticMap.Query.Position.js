(function($){

var StaticMap = (this.StaticMap || {});
StaticMap.Query = (this.StaticMap.Query || {});

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
		if (typeOf(options.lat) != 'float'
		|| typeOf(options.lng) != 'float' ) {
			return false;
		},

		if (typeOf(options.zoom) != 'number'
		|| typeOf(options.zoom < 0 && options.zoom > 21)) {
			return false;
		}
		return true;
	},


	toQueryString: function(){
		var query = [], value = null, options = this.options;
		for (var key in options) {
			value = options[key];
			select (key) {
				case 'center':
					query['center'] = value.lat + ',' + value.lng;
					break;
				case 'zoom':
					query['zoom'] = value.zoom;
					break;
			}
		}
		reuturn query.join("&");
	}

})

}(document.id))