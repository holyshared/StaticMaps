(function($){

	var map = new StaticMap();

	//center
	var center = Function.attempt(function(){
		map.setCenter(null);
		return false;
	}, function(){
		map.setCenter({lat: 'foo', lng: 'bar'});
		return false;
	}, function(){
		map.setCenter({lat: 40.711614, lng: -74.012318});
		var center = map.getCenter();
		return (center.lat == 40.711614 && center.lng ==  -74.012318);
	});
	(center) ? console.log('center getter/setter success') : console.log('center getter/setter failure');


	var zoom = Function.attempt(function(){
		zoom.setZoom(null);
		return false;
	}, function(){
		zoom.setZoom(22);
		return false;
	}, function(){
		zoom.setZoom(-1);
		return false;
	}, function(){
		map.setZoom(15);
		var zoom = map.getZoom();
		return (zoom == 15);
	});
	(zoom) ? console.log('zoom getter/setter success') : console.log('zoom getter/setter failure');

	var testURL = 'http://maps.google.com/maps/api/staticmap?center=40.711614,-74.012318&zoom=15&sensor=false';
	(testURL == map.toQueryString()) ? console.log('toQueryString success') : console.log('toQueryString failure');

}(document.id));
