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

	//QueryString
	map.addMarker(marker);

	var testURL = 'http://maps.google.com/maps/api/staticmap?size=600x300&markers=color:black|size:mid|label:T|Williamsburg%2CBrooklyn%2CNY&sensor=false';
	var url = map.toQueryString();
	(url == testURL) ? console.log('toQueryString getter/setter success') : console.log('toQueryString getter/setter failure');

	window.addEvent('domready', function(){
		map.renderTo($('staticMap'));
	});

}(document.id));
