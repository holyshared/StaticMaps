(function($){

	var map = new StaticMaps();

	map.setSize(600, 300);

	var marker = map.factory('marker', { size: 'tiny', point: { lat: 40, lng: 138 } });

	var markerTest = [];
	markerTest.append([
	    function(){
			marker.setSize('large');
			var size = marker.getSize();
			return (size != 'large');
	    },
	    function(){
			marker.setSize(100);
			var size = marker.getSize();
			return (size != 100);
	    },
	    function(){
			marker.setSize('mid');
			var size = marker.getSize();
			return (size == 'mid');
	    }
	]);
	var size = markerTest.some(function(tester, index){
		return (tester() == false);
	});
	(size) ? console.log('size getter/setter failure') : console.log('size getter/setter success');

	var colorTest = [];
	colorTest.append([
	    function(){
			marker.setColor('00');
			var color = marker.getColor();
			return (color != '00');
	    },
	    function(){
			marker.setColor(100);
			var color = marker.getColor();
			return (color != 100);
	    },
	    function(){
			marker.setColor('0x000000');
			var color = marker.getColor();
			return (color == '0x000000');
	    },
	    function(){
			marker.setColor('black');
			var color = marker.getColor();
			return (color == 'black');
	    }
	]);
	var color = colorTest.some(function(tester, index){
		return (tester() == false);
	});
	(color) ? console.log('color getter/setter failure') : console.log('color getter/setter success');


	var labelTest = [];
	labelTest.append([
	    function(){
			marker.setLabel('000000');
			var label = marker.getLabel();
			return (label != '00');
	    },
	    function(){
			marker.setLabel('AAA');
			var label = marker.getLabel();
			return (label != 'AAA');
	    },
	    function(){
			marker.setLabel('0');
			var label = marker.getLabel();
			return (label == '0');
	    },
	    function(){
			marker.setLabel('T');
			var label = marker.getLabel();
			return (label == 'T');
	    }
	]);
	var label = labelTest.some(function(tester, index){
		return (tester() == false);
	});
	(label) ? console.log('label getter/setter failure') : console.log('label getter/setter success');



	var pointTest = [];
	pointTest.append([
	    function(){
			marker.setPoint({ lat: 'aaa' });
			var point = marker.getPoint();
			return (point.getValue() == null);
	    },
	    function(){
			marker.setPoint('New York');
			var point = marker.getPoint();
			return (point.getValue() == 'New York');
	    },
	    function(){
			marker.setPoint({ lat: 40, lng: 138 });
			var point = marker.getPoint();
			return (point.toString() == '40,138');
	    }
	]);
	var point = pointTest.some(function(tester, index){
		return (tester() == false);
	});
	(point) ? console.log('point getter/setter failure') : console.log('point getter/setter success');



	var iconTest = [];
	iconTest.append([
	    function(){
			marker.setIcon('foobar');
			var icon = marker.getIcon();
			return (icon != 'foobar');
	    },
	    function(){
			marker.setIcon('http://');
			var icon = marker.getIcon();
			return (icon != 'http://');
	    },
	    function(){
			marker.setIcon('http://holyshared.github.com/StaticMaps/images/img_marker1.png');
			var icon = marker.getIcon();
			return (icon == 'http://holyshared.github.com/StaticMaps/images/img_marker1.png');
	    }
	]);
	var icon = iconTest.some(function(tester, index){
		return (tester() == false);
	});
	(icon) ? console.log('icon getter/setter failure') : console.log('icon getter/setter success');



	var shadowTest = [];
	shadowTest.append([
	    function(){
			marker.setShadow('tr');
			var shadow = marker.getShadow();
			return (shadow != 'tr');
	    },
	    function(){
			marker.setShadow({value: true});
			var shadow = marker.getShadow();
			return (shadow.value != true);
	    },
	    function(){
			marker.setShadow(true);
			var shadow = marker.getShadow();
			return (shadow == true);
	    }
	]);
	var shadow = shadowTest.some(function(tester, index){
		return (tester() == false);
	});
	(shadow) ? console.log('shadow getter/setter failure') : console.log('shadow getter/setter success');


	var emptyMarker = Function.attempt(function(){
		var marker1 = map.factory('marker');
		return true;
	});
	(emptyMarker) ? console.log('empty marker success') : console.log('empty marker failure');

	marker.setPoint('Williamsburg,Brooklyn,NY');

	//QueryString
	map.addMarker(marker);
	var testURL = 'http://maps.google.com/maps/api/staticmap?size=600x300&sensor=false&markers=color:black|size:mid|label:T|icon:http://holyshared.github.com/StaticMaps/images/img_marker1.png|shadow:true|Williamsburg%2CBrooklyn%2CNY';
	var url = map.toQueryString();

	(url == testURL) ? console.log('toQueryString success') : console.log('toQueryString failure');

	window.addEvent('domready', function(){
		map.renderTo($('staticMap'));
	});

}(document.id));
