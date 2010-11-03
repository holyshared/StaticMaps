StaticMaps
============

StaticMaps API Document
--------------------------

### StaticMaps

* setSensor
* getSensor
* renderTo
* toQueryString
* factory

#### Function concerning position. 

It is possible to use it by adding *StaticMaps.Position*. 

##### StaticMaps.Position

* setCenter
* setZoomt
* getCenter
* getZoom

#### Function concerning map.
 
It is possible to use it by adding *StaticMaps.Map*.

##### StaticMaps.Map

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
 
It is possible to use it by adding *StaticMaps.Marker*.

##### StaticMaps.Marker

* addMarker 
* addMarkers
* removeMarker 
* removeMarkers

#### Function concerning path.

##### StaticMaps.Path

* setPathWeight
* setPathColor
* setPathFillColor
* setPathPoints
* getPathWeight
* getPathColor
* getPathFillColor
* getPathPoints
* addPathPoint
* addPathPoints
* removePathPoint
* removePathPoints

### StaticMaps.Point

* setValue
* getValue
* toString

### StaticMaps.Marker

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
