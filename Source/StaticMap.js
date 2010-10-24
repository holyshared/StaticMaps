(function($){

var StaticMap = this.StaticMap = new Class({

	Implements: [Options],

	url: 'http://maps.google.com/maps/api/staticmap',

	initialize: function(options){
		this.setOptions(options);
	},

	isValid: function(){
	},

	render: function(){
	},

	factory: function(type, props){
		var className = type.capitalize();
		if (StaticMap[className] == null || StaticMap[className] == 'undefind') {
			throw new TypeError('The class that was able to make it to the instance was not found');
		}
		return StaticMap[className].factory(props);
	}

});

}(document.id));