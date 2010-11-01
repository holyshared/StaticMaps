(function($){

	window.addEvent('domready', function(){

		var options = {
			map: {
				size: { width: 600, height: 300 },
				format: 'png',
				maptype: 'roadmap',
				mobile: false,
				language: 'en'
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
			]
		};
		var map = new StaticMaps(options);
		map.renderTo($('map'));
	});

}(document.id));
