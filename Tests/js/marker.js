(function($){

	var map = new StaticMap();

	map.setSize(600, 300);

	var marker = map.factory('marker', { size: 'tiny', point: { lat: 40, lng: 138 } });
	var size = Function.attempt(function(){
		marker.setSize('large');
		return false;
	}, function(){
		marker.setSize(null);
		return false;
	}, function(){
		marker.setSize('mid');
		var size = marker.getSize();
		return (size == 'mid');
	});
	(size) ? console.log('size getter/setter success') : console.log('size getter/setter failure');

	var color1 = Function.attempt(function(){
		marker.setColor('00');
		return false;
	}, function(){
		marker.setColor(null);
		return false;
	}, function(){
		marker.setColor('0x000000');
		var color = marker.getColor();
		return (color == '0x000000');
	});
	(color1) ? console.log('color1 getter/setter success') : console.log('color1 getter/setter failure');

	var color2 = Function.attempt(function(){
		marker.setColor('black');
		var color = marker.getColor();
		return (color == 'black');
	});
	(color2) ? console.log('color2 getter/setter success') : console.log('color2 getter/setter failure');



	var label = Function.attempt(function(){
		marker.setLabel('00');
		return false;
	}, function(){
		marker.setLabel(null);
		return false;
	}, function(){
		marker.setLabel('AA');
		return false;
	}, function(){
		marker.setLabel('T');
		var label = marker.getLabel();
		return (label == 'T');
	});
	(label) ? console.log('label getter/setter success') : console.log('label getter/setter failure');


	var point1 = Function.attempt(function(){
		marker.setPoint('');
		return false;
	}, function(){
		marker.setPoint(null);
		return false;
	}, function(){
		marker.setPoint({ lat: 40, lng: 138 });
		var point = marker.getPoint();
		return (point.lat == 40 && point.lng == 138);
	});
	(point1) ? console.log('point1 getter/setter success') : console.log('point1 getter/setter failure');


	var point2 = Function.attempt(function(){
		marker = marker.setPoint('Williamsburg,Brooklyn,NY');
		var point = marker.getPoint();
		return (point == 'Williamsburg,Brooklyn,NY');
	});
	(point2) ? console.log('point2 getter/setter success') : console.log('point2 getter/setter failure');

	var icon = Function.attempt(function(){
		marker.setIcon('');
		return false;
	}, function(){
		marker.setIcon(null);
		return false;
	}, function(){
		marker.setIcon('http://holyshared.github.com/StaticMaps/images/img_marker1.png');
		var icon = marker.getIcon();
		return (icon == 'http://holyshared.github.com/StaticMaps/images/img_marker1.png');
	});
	(icon) ? console.log('icon getter/setter success') : console.log('icon getter/setter failure');


	var shadow = Function.attempt(function(){
		marker.setShadow('');
		return false;
	}, function(){
		marker.setShadow(null);
		return false;
	}, function(){
		marker.setShadow(true);
		var shadow = marker.getShadow();
		return (shadow == true);
	});
	(shadow) ? console.log('shadow getter/setter success') : console.log('shadow getter/setter failure');

	//QueryString
	map.addMarker(marker);

	var testURL = 'http://maps.google.com/maps/api/staticmap?size=600x300&markers=color:black|size:mid|label:T|Williamsburg%2CBrooklyn%2CNY&sensor=false';
	var url = map.toQueryString();
	(url == testURL) ? console.log('toQueryString success') : console.log('toQueryString failure');

	var map2 = new StaticMap();
	map2.setSize(600, 300).setZoom(15);
	map2.addMarker({
		icon: 'http://holyshared.github.com/StaticMaps/images/img_marker1.png',
		shadow: false,
		point: 'Williamsburg,Brooklyn,NY'
	});

	window.addEvent('domready', function(){
		map2.renderTo($('staticMap'));
	});

}(document.id));
