(function($){

var StaticMap = this.StaticMap = new Class({

	Implements: [Options],

	initialize: function(options){
		this.setOptions(options);
	},

	isValid: function(){
	},

	render: function(){
	},

	factory: function(type, props){
		return StaticMap[type].factory(props);
	}

});

}(document.id))