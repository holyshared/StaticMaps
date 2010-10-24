(function($){

	window.addEvent('domready', function(){
		var center = {
			lat: 40.711614,
			lng: -74.012318
		};
	
		var map = new StaticMap();
		map.setSize(600, 300)
		.setFormat('png')
		.setMobile(false)
		.setLanguage('ja');
	
		map.setCenter(center).setZoom(15);
		map.renderTo($('staticMap'));
	});

}(document.id));
