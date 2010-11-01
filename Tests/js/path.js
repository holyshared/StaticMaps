(function($){

	window.addEvent('domready', function(){
		var map = new StaticMaps();

		
		var color = Function.attempt(function(){
			map.setPathColor(null);
			return false;
		}, function(){
			map.setPathColor('000');
			return false;
		}, function(){
			map.setPathColor('black');
			var color = map.getPathColor();
			return (color == 'black');
		});
		(color) ? console.log('color getter/setter success') : console.log('color getter/setter failure');

		
		map.renderTo($('staticMap'));
	});

}(document.id));
