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

	
	var formatTest = [];
	formatTest.append([
		function(){
			map.setFormat('unkownformat');
			var format = map.getFormat();
			return (format != 'unkownformat');
		},
		function(){
			map.setFormat('ai');
			var format = map.getFormat();
			return (format != 'ai');
		},
		function(){
			map.setFormat('png');
			var format = map.getFormat();
			return (format == 'png');
		}
	]);
	var format = formatTest.some(function(tester, index){
		return (tester() == false);
	});
	(format) ? console.log('format getter/setter failure') : console.log('format getter/setter success');


	var maptypeTest = [];
	maptypeTest.append([
		function(){
			map.setMapType('unkownMapTYpe');
			var mapType = map.getMapType();
			return (mapType != 'unkownMapTYpe');
		},
		function(){
			var o = {foo:'bar'};
			map.setMapType(o);
			var mapType = map.getMapType();
			return (mapType != o);
		},
		function(){
			map.setMapType('roadmap');
			var mapType = map.getMapType();
			return (mapType == 'roadmap');
		}
	]);
	var maptype = maptypeTest.some(function(tester, index){
		return (tester() == false);
	});
	(maptype) ? console.log('mapType getter/setter failure') : console.log('mapType getter/setter success');




	var mobileTest = [];
	mobileTest.append([
		function(){
			map.setMobile('unkown');
			var mobile = map.getMobile();
			return (mobile != 'unkown');
		},
		function(){
			var o = {foo:'bar'};
			map.setMobile(o);
			var mobile = map.getMobile();
			return (mobile != o);
		},
		function(){
			map.setMobile(true);
			var mobile = map.getMobile();
			return (mobile == true);
		}
	]);
	var mobile = maptypeTest.some(function(tester, index){
		return (tester() == false);
	});
	(mobile) ? console.log('mobile getter/setter failure') : console.log('mobile getter/setter success');




	var languageTest = [];
	languageTest.append([
		function(){
			map.setLanguage('unkown');
			var language = map.getLanguage();
			return (language != 'unkown');
		},
		function(){
			var o = {foo:'bar'};
			map.setLanguage(o);
			var language = map.getLanguage();
			return (language != o);
		},
		function(){
			map.setLanguage('en');
			var language = map.getLanguage();
			return (language == 'en');
		}
	]);
	var language = languageTest.some(function(tester, index){
		return (tester() == false);
	});
	(language) ? console.log('language getter/setter failure') : console.log('language getter/setter success');




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
				mapType: 'hybrid',
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
