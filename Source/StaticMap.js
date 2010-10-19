(function($){

var StaticMap = this.StaticMap = new Class({

	Implements: [Options],

	initialize: function(options){
		this.setOptions(options);
	},

	isValid: function(){
		var query = null, ns = null, cn = null;
		for (var key in this.queries) {
			query = this.queries[key].split('.');
			ns = query.shift();
			cn = query.shift();

			var queryInstance = new StaticMap[ns][cn](this.options[key]);
			if (!queryInstance.validate()) {
				return false;
			}
		}
	},

	render: function(element){
		var staticMap = new Element('img', {'src': ''});
		staticMap.inject(element);
	}

});

StaticMap.queries = {};
StaticMap.registerQuery = function(key, name){
	this.queries[key] = name;
}

}(document.id))