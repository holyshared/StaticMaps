StaticMaps 0.2
============

StaticMaps API Document
--------------------------

### StaticMaps

* setSize
* setFormat
* setMapType
* setMobile
* setLanguage
* setSensor
* getSize
* getFormat
* getMapType
* getMobile
* getLanguage
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
