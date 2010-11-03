(function($){

	var map = new StaticMaps();

	var centerTest = [];
	centerTest.append([
	    function(){
			map.setCenter('japan');
			var center = map.getCenter();
			return (center == 'japan');
	    },
	    function(){
			map.setCenter({lat: 'foo', lng: 'bar'});
			var center = map.getCenter();
			return (center.lat != 'foo' && center.lng != 'bar');
	    },
	    function(){
			map.setCenter({lat: 40.711614, lng: -74.012318});
			var center = map.getCenter();
			return (center.lat == 40.711614 && center.lng == -74.012318);
	    }
	]);
	var center = centerTest.some(function(tester, index){
		return (tester() == false);
	});
	(center) ? console.log('center getter/setter failure') : console.log('center getter/setter success');



	var zoomTest = [];
	zoomTest.append([
	    function(){
			map.setZoom('japan');
			var zoom = map.getZoom();
			return (center != 'japan');
	    },
	    function(){
			map.setZoom(-1);
			var zoom = map.getZoom();
			return (zoom != -1);
	    },
	    function(){
			map.setZoom(30);
			var zoom = map.getZoom();
			return (zoom != 30);
	    },
	    function(){
			map.setZoom(15);
			var zoom = map.getZoom();
			return (zoom == 15);
	    }
	]);
	var zoom = zoomTest.some(function(tester, index){
		return (tester() == false);
	});
	(zoom) ? console.log('zoom getter/setter failure') : console.log('zoom getter/setter success');


	var testURL = 'http://maps.google.com/maps/api/staticmap?center=40.711614,-74.012318&zoom=15&sensor=false';
	(testURL == map.toQueryString()) ? console.log('toQueryString success') : console.log('toQueryString failure');

}(document.id));
