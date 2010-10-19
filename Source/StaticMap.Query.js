(function($){

var StaticMap = (this.StaticMap || {});
StaticMap.Query = new Class({

	Implements: [Options],

	options: {
	},

	initialize: function(options){
		this.setOptions(options);
	},

	set: function(key, value){
		if (Object.keyOf(this.options, key) == false) {
			return false;
		}
		this.options[key] = value;
	},

	get: function(key){
		return this.options[key];
	},

	validate: function(){
	},

	toQueryString: function(){
	}

})

}(document.id))