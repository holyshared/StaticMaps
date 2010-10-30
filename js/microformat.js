(function($){

window.addEvent('domready', function(){

	var events = HCalendar.discover();

	var vevents = $$('.vevent');
	vevents.each(function(vevent, index){
		var event = events[index];
		var container = $(vevent).getElement('.map');

		var geo = event.geo;
		var point = {
			lat: parseFloat(geo.latitude),
			lng: parseFloat(geo.longitude)
		};

		var map = new StaticMaps();
		map.setSize(270, 165)
			.setCenter(point)
			.setZoom(19);

		var marker = map.factory('marker', {
			point: point,
			label: 'O'
		});
		map.addMarker(marker);
		map.renderTo(container);

	});

});

}(document.id));
