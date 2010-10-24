(function($){

	var map = new StaticMap();
	map.setCenter({lat: 40.711614, lng: -74.012318});

	map.setZoom(0);
	map.setZoom(21);
	map.setZoom(10);
	try {
		map.setZoom(-1);
	} catch(e) {
		console.log(e);	
	}
	try {
		map.setZoom(22);
	} catch(e) {
		console.log(e);	
	}

	var testURL = 'http://maps.google.com/maps/api/staticmap?center=40.711614,-74.012318&amp;zoom=10';
	if (testURL == map.toQueryString()) {
		console.log(map.toQueryString());
	}

}(document.id));
