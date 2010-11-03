(function($){

	window.addEvent('domready', function(){
		var map = new StaticMaps();
		map.setSize(600, 300).setZoom(15).setCenter('New York');

		var pathWeightTest = [];
		pathWeightTest.append([
		    function(){
				map.setPathWeight('large');
				var pathWeight = map.getPathWeight();
				return (pathWeight != 'large');
		    },
		    function(){
				map.setPathWeight(5);
				var pathWeight = map.getPathWeight();
				return (pathWeight == 5);
		    }
		]);
		var pathWeight = pathWeightTest.some(function(tester, index){
			return (tester() == false);
		});
		(pathWeight) ? console.log('pathWeight getter/setter failure') : console.log('pathWeight getter/setter success');


		var pathColorTest = [];
		pathColorTest.append([
		    function(){
				map.setPathColor('large');
				var pathColor = map.getPathColor();
				return (pathColor != 'large');
		    },
		    function(){
				map.setPathColor(100);
				var pathColor = map.getPathColor();
				return (pathColor != 100);
		    },
		    function(){
				map.setPathColor('0x000000');
				var pathColor = map.getPathColor();
				return (pathColor == '0x000000');
		    },
		    function(){
				map.setPathColor('black');
				var pathColor = map.getPathColor();
				return (pathColor == 'black');
		    }
		]);
		var pathColor = pathColorTest.some(function(tester, index){
			return (tester() == false);
		});
		(pathColor) ? console.log('pathColor getter/setter failure') : console.log('pathColor getter/setter success');


		var pathFillColorTest = [];
		pathFillColorTest.append([
		    function(){
				map.setPathFillColor('large');
				var pathColor = map.getPathFillColor();
				return (pathColor != 'large');
		    },
		    function(){
				map.setPathFillColor(100);
				var pathColor = map.getPathFillColor();
				return (pathColor != 100);
		    },
		    function(){
				map.setPathFillColor('0x000000');
				var pathColor = map.getPathFillColor();
				return (pathColor == '0x000000');
		    },
		    function(){
				map.setPathFillColor('black');
				var pathColor = map.getPathFillColor();
				return (pathColor == 'black');
		    },
		    function(){
				map.setPathFillColor('0xFFFFFF');
				var pathColor = map.getPathFillColor();
				return (pathColor == '0xFFFFFF');
		    }			
		]);
		var fillColor = pathFillColorTest.some(function(tester, index){
			return (tester() == false);
		});
		(fillColor) ? console.log('pathFillColor getter/setter failure') : console.log('pathFillColor getter/setter success');

		var pointA = map.addPathPoint('New York');
		var pointB = map.addPathPoint('Solomon R. Guggenheim Museum');
		var pointC = map.addPathPoint({'lat': 40.711828, 'lng': -74.011933});
		map.addPathPoint({'lat': 'aaa', 'lng': 'bbb'});
		map.removePathPoint(pointB);

		var testURLA = 'http://maps.google.com/maps/api/staticmap?size=600x300&sensor=false&center=New%20York&zoom=15&path=weight:5|color:black|fillcolor:0xFFFFFF|New%20York|40.711828,-74.011933';

		(map.toQueryString() == testURLA)
		? console.log('add/removePathPoint success')
		: console.log('add/removePathPoint ailure');

		map.renderTo($('staticMap1'));

		map.removePathPoints([pointA, pointC]);

		var testURLB = 'http://maps.google.com/maps/api/staticmap?size=600x300&sensor=false&center=New%20York&zoom=15&path=weight:5|color:black|fillcolor:0xFFFFFF';

		(map.toQueryString() == testURLB)
		? console.log('removePathPoints success')
		: console.log('removePathPoints failure');



		map.renderTo($('staticMap2'));
	});

}(document.id));
