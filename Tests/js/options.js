(function($){

	window.addEvent('domready', function(){

		var options = {
			map: {
				size: { width: 600, height: 300 },
				format: 'png',
				mapType: 'roadmap',
				mobile: false,
				language: 'en',
				sensor: true
			},
			position: {
				center:  '原美術館',
				zoom: 15 
			},
			markers: [
				{
					point: '原美術館',
					icon: 'http://holyshared.github.com/StaticMaps/images/img_marker1.png'
				}
			],
			path: {
				weight: 5,
				color: '0xFF0000',
				fillColor: '0xFFFFFF',
				points: [
					'原美術館',
					{lat: 35.630146, lng: 139.740434}
				]
			}
		};
		var map = new StaticMaps(options);
		map.renderTo($('map'));
	});

}(document.id));
