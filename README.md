StaticMaps
=================================

It draws in a static map with Static Maps API V2. The acquisition of URL is also possible.

How to use
-----------------------

### StaticMap

#### Options

##### Positions

* **positions**: (object) - Position where map is displayed.
	* **center**: (object|string) - The center position, the coordinates position or the address in the map can be specified. 
	* **zoom**: (number) - Zoom level of map. The value from 0 to 21 can be specified.

##### Map

* **map**: (object) - The map is optional.
	* **size**: (object) - Key pair object of width and height.
	* **format**: (string) - Image format in map.  Jpg, png, and gif, etc. can be specified. 
	* **maptype**: (string) - Kind of map. Either roadmap, satellite, terrain or hybrid can be specified. 
	* **mobile**: (boolean) - It displays it by mobile correspondence.
	* **language**: (string) - Locale in map. en and ja, etc.

##### Markers

* **markers**: (array) - Two or more marker objects.
	* **marker**: (object) - Marker object.
		* **color**: (string) - The color code in 24 bits or the defined colors can be specified. 
		* **size**: (string) - It is possible to specify it from the size, tiny, mid, and small of the marker.
		* **label**: (string) - The marker's label. One character in A-Z0-9 can be specified. 
		* **point**: (object|string) - Coordinates position of marker. Coordinates or the address can be specified. 
