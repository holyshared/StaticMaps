StaticMaps 0.2
=================================

It draws in a static map with Static Maps API V2. The acquisition of URL is also possible.

![Screenshot](http://holyshared.github.com/StaticMaps/icon.png)

How to use
-----------------------

### Loading of necessary library.

Mootools and the StaticMaps library are described in HTML in the head element.

	#HTML
	<head>
		<script type="text/javascript" src="mootools-core1.3.js"></script>
		<script type="text/javascript" src="StaticMaps.js"></script>
		<script type="text/javascript" src="StaticMaps.Position.js"></script>
		<script type="text/javascript" src="StaticMaps.Marker.js"></script>
		<script type="text/javascript" src="StaticMaps.Path.js"></script>
	</head>

### Preparation for container element that draws in map

The container element that draws in the map is described.

    #HTML
    <div id="staticMap"></div>

### Description of javascript

It draws in the map in the element that specifies the parameter necessary for the option, executes the renderTo method, and specifies it.

	#JS
	window.addEvent('domready', function(){
		var map = new StaticMaps({
			position: {
				center: {lat: 35.710698, lng: 139.81257},
				zoom: 15
			},
			map: {
				size: {
					width: 600,
					height: 300
				},
				format: 'jpg',
				mapType: 'roadmap',
				mobile: true,
				language: 'en'
			},
			markers: [
				{
					color: '0xCCCCCCC',
					size: 'mid',
					label: 'A',
					point: 'New York'
				},
				{
					color: '0xFFCCCCC',
					size: 'mid',
					label: 'B',
					point: {lat: 40.714353, lng: -74.005973}
				}
			],
			path: {
				color: '0xFF0000',
				points: [
					'New York',
					{ lat: 40.714353, lng: -74.005973 }
				]
			}
		});
		map.renderTo($('staticMap'));
	});

Moreover, it is also possible to specify it individually by using the method of the setter. 

	#JS
	window.addEvent('domready', function(){

		//It draws specifying the condition in the map. 
		var map = new StaticMaps();

		map.setSize(600, 300)
			.setCenter({
				lat: 35.710698,
				lng: 139.81257
			})
			.setZoom(15);

		map.addMarker({
			color: '0xCCCCCCC',
			size: 'mid',
			label: 'A',
			point: 'New York'
		});

		var marker = map.factory('marker', {
			color: '0xCCCCCCC',
			size: 'mid'
		});
		marker.setLable('B')
			.setPoint({
				lat: 40.714353,
				lng: -74.005973
			});

		map.addMarker(marker);
		map.renderTo($('staticMap'));

		//A new map is added. 
		var url = map.toQueryString();
		var img = new Element('img', { src: url });
		img.inject($('staticMap'));
	});


#### Options

##### Position

* **position**: (object) - Position where map is displayed.
	* **center**: (object|string) - The center position, the coordinates position or the address in the map can be specified. 
	* **zoom**: (number) - Zoom level of map. The value from 0 to 21 can be specified.

##### Map

* **map**: (object) - The map is optional.
	* **size**: (object) - Key pair object of width and height.
	* **format**: (string) - Image format in map.  Jpg, png, and gif, etc. can be specified. 
	* **mapType**: (string) - Kind of map. Either roadmap, satellite, terrain or hybrid can be specified. 
	* **mobile**: (boolean) - It displays it by mobile correspondence.
	* **language**: (string) - Locale in map. en and ja, etc.

##### Markers

* **markers**: (array) - Two or more marker objects.
	* **marker**: (object) - Marker object.
		* **color**: (string) - The color code in 24 bits or the defined colors can be specified. 
		* **size**: (string) - It is possible to specify it from the size, tiny, mid, and small of the marker.
		* **label**: (string) - The marker's label. One character in A-Z0-9 can be specified. 
		* **point**: (object|string) - Coordinates position of marker. Coordinates or the address can be specified. 
		* **icon**: (string) - URL of custom marker.
		* **shadow**: (boolean) - The shadow of the marker is displayed.

##### Path

* **path**: (object) - Information on passing.
	* **weigth**: (number) - Thickness of line.
	* **color**: (string) - Color of line.
	* **fillColor**: (string) - Color that paints out passing.
	* **points**: (array) - One or more coordinates or name of a places of passing and addresses.
