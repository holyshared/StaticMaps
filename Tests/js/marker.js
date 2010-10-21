(function($){

	var map = StaticMap();
	map.addMarker({
		color: 'red',
		size: 'mid',
		label: 'A',
		point: {
			lat: 37,
			lng: 138
		}
	});

	var markerB = StaticMap.factory('marker', {
		label: 'B',
		point: {
			lat: 40,
			lng: 138
		}
	});
	map.addMarker(markerB);

}(document.id));
