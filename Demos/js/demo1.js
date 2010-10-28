(function($){

window.addEvent('domready', function(){

	var point = '原美術館';

	var map = new StaticMaps();
	map.setSize(445, 245)
		.setCenter(point)
		.setZoom(16);

	var marker = map.factory('marker', {
		point: point,
		icon: 'http://holyshared.github.com/StaticMaps/images/img_marker1.png'
	});
	map.addMarker(marker);
	map.renderTo($('map'));

});

}(document.id));
