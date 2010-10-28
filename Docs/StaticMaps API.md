StaticMaps
============

StaticMap API Document
--------------------------

### StaticMap

* setSensor
* getSensor
* renderTo
* toQueryString
* factory

#### Function concerning position. 

It is possible to use it by adding *StaticMap.Position*. 

##### StaticMap.Position

* setCenter
* setZoomt
* getCenter
* getZoom


#### Function concerning map.
 
It is possible to use it by adding *StaticMap.Map*.

##### StaticMap.Map

* setSize
* setFormat
* setMapType
* setMobile
* setLanguage
* getSize
* getFormat
* getMapType
* getMobile
* getLanguage


#### Function concerning marker.
 
It is possible to use it by adding *StaticMap.Marker*.

##### StaticMap.Marker

* addMarker 

### StaticMap.Querys

* getQueries
* registerQuery

### StaticMap.Position

* toQueryString

### StaticMap.Map

* toQueryString

### StaticMap.Marker

* setProperties
* setColor
* setLabel
* setSize
* setPoint
* getColor
* getLabel
* getSize
* getPoint
* toObject
* toQueryString
