Ext.define('PhillySchools.view.Map', {
    extend: 'Ext.Map',
	xtype: 'singleschoolmap',
    config: {
		schoolDetail: null,
		marker: null,
		title: 'Map',
		useCurrentLocation : true,
        mapOptions: {
			zoomControl: false,
			panControl: false,
			rotateControl: false,
			streetViewControl: false,
			mapTypeControl: false,
			zoom: 11,
			center: new google.maps.LatLng(39.9529, -75.1602)
		},
		geo: {
			autoUpdate: false
		}
    },
    updateSchoolDetail: function(schoolDetail) {
		var mapView = this,
			marker = mapView.getMarker(),
			latlng = new google.maps.LatLng(schoolDetail.get('latitude'), schoolDetail.get('longitude')),
			map = mapView.getMap();
			
		if(map) {		
			if(marker) {
				marker.setMap(null);
			}
	
			marker = new google.maps.Marker({
	            position: latlng,
	            map: map,
	            icon: 'http://' + location.hostname + '/app/PhillySchools/resources/images/open_school.png'
	        });
	        mapView.setMarker(marker);
		}
    }
});