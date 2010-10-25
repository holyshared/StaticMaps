(function($){

window.addEvent('domready', function(){

	var point = '原美術館';

	var map = new StaticMap();
	map.setSize(445, 245)
		.setCenter(point)
		.setZoom(16);

	var marker = map.factory('marker', {
		point: point,
		label: 'H'
	});
	map.addMarker(marker);
	map.renderTo($('map'));

});

}(document.id));
