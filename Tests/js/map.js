(function($){

	var map = new StaticMaps();

	var sizeTest = [];
	sizeTest.append([
	    function(){
			map.setSize('600x600');
			var size = map.getSize();
			return (size != '600x600');
	    },
	    function(){
			map.setSize(0, 0);
			var size = map.getSize();
			return (size.width != 0 && size.height != 0);
	    },
	    function(){
			map.setSize(100, 100);
			var size = map.getSize();
			return (size.width == 100 && size.height == 100);
	    }
	]);
	var size = sizeTest.some(function(tester, index){
		return (tester() == false);
	});
	(size) ? console.log('size getter/setter failure') : console.log('size getter/setter success');

	
	
	//Format setter/getter
	var format = Function.attempt(function(){
		map.setFormat(null);
		return false;
	}, function(){
		map.setFormat('ai');
		return false;
	}, function(){
		map.setFormat('png');
		var format = map.getFormat();
		return (format == 'png');
	});
	(format) ? console.log('format getter/setter success') : console.log('format getter/setter failure');

	//MapType setter/getter
	var maptype = Function.attempt(function(){
		map.setMapType(null);
		return false;
	}, function(){
		map.setMapType('blank');
		return false;
	}, function(){
		map.setMapType('roadmap');
		var maptype = map.getMapType();
		return (maptype == 'roadmap');
	});
	(maptype) ? console.log('maptype getter/setter success') : console.log('maptype getter/setter failure');


	//Mobile setter/getter
	var mobile = Function.attempt(function(){
		map.setMobile(null);
		return false;
	}, function(){
		map.setMobile('pc');
		return false;
	}, function(){
		map.setMobile(true);
		var mobile = map.getMobile();
		return (mobile == true);
	});
	(mobile) ? console.log('mobile getter/setter success') : console.log('mobile getter/setter failure');


	//Language setter/getter
	var language = Function.attempt(function(){
		map.setLanguage(null);
		return false;
	}, function(){
		map.setLanguage('java');
		return false;
	}, function(){
		map.setLanguage('en');
		var language = map.getLanguage();
		return (language == 'en');
	});
	(language) ? console.log('language getter/setter success') : console.log('language getter/setter failure');

	window.addEvent('domready', function(){
		var map = new StaticMaps({
			positions: {
				center: {
					lat: 40.711614,
					lng: -74.012318
				},
				zoom: 15
			},
			map: {
				size: { width: 600, height: 300 },
				format: 'png8',
				maptype: 'hybrid',
				mobile: true,
				language: 'en'
			}
		});
		map.renderTo($('staticMap2'));
	});

	window.addEvent('domready', function(){
		var center = {
			lat: 40.711614,
			lng: -74.012318
		};

		var map = new StaticMaps();
		map.setSize(600, 300)
		.setFormat('png')
		.setMobile(false)
		.setLanguage('ja');

		map.setCenter(center).setZoom(15);
		map.renderTo($('staticMap1'));
	});

}(document.id));
