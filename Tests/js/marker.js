(function($){

	var map = new StaticMap();
	map.addMarker({ color: 'red', size: 'mid', label: 'A', point: { lat: 37, lng: 138 } });

	//Size
	var marker = null;
	marker = map.factory('marker', { size: 'tiny', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { size: 'small',point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { size: 'mid', point: { lat: 40, lng: 138 } });
	try {
		marker = map.factory('marker', { size: 'large', point: { lat: 40, lng: 138 } });
	} catch (e) {
		console.log(e);
	}

	//Color
	marker = map.factory('marker', { color: 'red', size: 'mid', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { color: 'black', size: 'mid', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { color: 'blue', size: 'mid', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { color: '0x000000', size: 'mid', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { color: '0xFF0000', size: 'mid', point: { lat: 40, lng: 138 } });
	try {
		marker = map.factory('marker', { color: '00', size: 'mid', point: { lat: 40, lng: 138 } });
	} catch (e) {
		console.log(e);
	}

	//Label
	marker = map.factory('marker', { label: 'A', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { label: 'Z', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { label: '0', point: { lat: 40, lng: 138 } });
	marker = map.factory('marker', { label: '9', point: { lat: 40, lng: 138 } });
	try {
		marker = map.factory('marker', { label: 'foo', point: { lat: 40, lng: 138 } });
	} catch (e) {
		console.log(e);
	}
	try {
		marker = map.factory('marker', { label: 'FOO', point: { lat: 40, lng: 138 } });
	} catch (e) {
		console.log(e);
	}
	try {
		marker = map.factory('marker', { label: '0000', point: { lat: 40, lng: 138 } });
	} catch (e) {
		console.log(e);
	}

	//Point
	marker = map.factory('marker', { point: 'Tokyo Operacity' });
	marker = map.factory('marker', { point: { lat: 40, lng: 138 } });
	try {
		marker = map.factory('marker', { point: null });
	} catch (e) {
		console.log(e);
	}
	try {
		marker = map.factory('marker', { point: { lat: 'foo', lng: 'bar' } });
	} catch (e) {
		console.log(e);
	}

}(document.id));
