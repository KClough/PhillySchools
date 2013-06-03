/*jslint browser: true, undef: true *//*global Ext,PhillySchools,google*/
Ext.define('PhillySchools.controller.Schools',{
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.MessageBox',
		'PhillySchools.API'
	],
	
	config:{
		views: [
			'Demographics',
			'Main',
			'Map',
			'SchoolDetail'
		],
		stores: [
			'Schools',
			'ClosedSchools',
			'SchoolDetails',
			'SchoolDemographics',
			'SchoolDemographicsChart'
		],
		refs: {
			mainTabPanel: 'maintabpanel',
			schoolsNavView: 'maintabpanel #schoolsNavView',
			schoolsListView: 'maintabpanel #schoolsNavView #schoolsList',
			closedSchoolsNavView: 'maintabpanel #closedSchoolsNavView',
			closedSchoolsListView: 'maintabpanel #closedSchoolsNavView #closedSchoolsList',
			schoolDetailView: {
				selector: 'schooldetailview',
				autoCreate: true,
				
				// autoCreate config
				xtype: 'schooldetailview'
			},
			schoolsMap: 'maintabpanel #schoolsMap',
			mapsNavigationView: 'maintabpanel #mapsNavigationView',
			singleSchoolMapView: {
				selector: 'singleschoolmap',
				autoCreate: true,
				
				// autoCreate config
				xtype: 'singleschoolmap'
			},
			schoolDemographicsView: {
				selector: 'demographicsview',
				autoCreate: true,
				
				// autoCreate config
				xtype: 'demographicsview'
			}
		},
		control: {
			schoolsListView: {
				activate: 'onSchoolsListViewActivate',
				itemtap: 'onSchoolSelected'
			},
			closedSchoolsListView: {
				activate: 'onSchoolsListViewActivate',
				itemtap: 'onClosedSchoolSelected'
			},
			schoolsMap: {
				maprender: 'onMapRender'
			},
			'maintabpanel #mapsNavigationView segmentedbutton': {
				toggle: 'onMapSegmentedButtonToggle'
			},
			'schooldetailview button[action=showMap]': {
				tap: 'onShowSchoolDetailButtonTap'
			},
			singleSchoolMapView: {
				maprender: 'onSingleSchoolMapRender'
			},
			'schooldetailview button[action=showDemographics]': {
				tap: 'onShowSchoolDetailDemographicsButtonTap'	
			}
		},
		routes: { 
			'schools/:code': 'showSchool',
//			'schools/:code/map': 'showSchoolMap',
//			'schools/:code/demographics': 'showSchoolDemographics',			
			'closedschools/:code' : 'showClosedSchool',
			'maps/:code': 'showMapSchool'
		}
	},
	
	
	// template methods
	init: function() {
		var me = this;
		//TODO make a generic callback that both can use
		Ext.getStore('Schools').load({
			callback: function(records, operation, success) {
				var mainTabPanel = me.getMainTabPanel(),
					map = me.getSchoolsMap().getMap(),
					i = 0, latlngs = [], latlng;
					
				if(success) {
					for(; i < records.length; i++) {
						latlng = new google.maps.LatLng(records[i].get('latitude'), records[i].get('longitude'));
			            latlngs.push({loc:latlng, code:records[i].get('code')});
					}
					mainTabPanel.setOpenSchoolLatlngs(latlngs);
				}
			}
		});
		Ext.getStore('ClosedSchools').load({
			callback: function(records, operation, success) {
				var mainTabPanel = me.getMainTabPanel(),
					i = 0, latlngs = [], latlng;
					
				if(success) {
					for(; i < records.length; i++) {
						latlng = new google.maps.LatLng(records[i].get('latitude'), records[i].get('longitude'));
			            latlngs.push({loc:latlng, code:records[i].get('code')});
					}
					mainTabPanel.setClosedSchoolLatlngs(latlngs);
				}
			}
		});
	},
	
	// route handlers
	showSchool: function(code) {
		this.pushSchoolDetailToNavigationView(code, this.getSchoolsNavView());
	},
	
	showClosedSchool: function(code) {
		this.pushSchoolDetailToNavigationView(code, this.getClosedSchoolsNavView());
	},
	
	showSchoolDemographics: function(code) {
		var me = this,
//			schoolNavView = me.getSchoolsNavView(),
			schoolNavView = Ext.ComponentQuery.query('maintabpanel')[0].getActiveItem(),
			schoolDemographicsStore = Ext.getStore('SchoolDemographics'),
			schoolDemographicsChartStore = Ext.getStore('SchoolDemographicsChart');
			
		
		me.pushSchoolDetailToNavigationView(code, schoolNavView, function(record) {
			schoolNavView.setMasked({
				xtype: 'loadmask',
				message: 'Loading Demographics&hellip;'
			});
			
			schoolDemographicsStore.load({
				url: '/' + code + '/school_ethnicity_low_income',
				callback: function(records, operation, success) {
					if(success && records.length > 0) {
						var data = [],
							record = records[records.length -1 ],
							ethneticities = ['african_american','white','asian','latino','other','pacific_islander','american_indian'],
							i = 0;
						
						for(; i < ethneticities.length; i++) {
							data.push({ demographic: ethneticities[i], population: record.get(ethneticities[i])});
						}

						schoolDemographicsChartStore.setData(data);
						
						//schoolDemographicsView throws error if instanciated before store is populated -KBC
						//TODO submit bug to sencha
						var schoolDemographicsView = me.getSchoolDemographicsView();
						schoolDemographicsView.setDemographics(data);
						if(schoolNavView.getActiveItem() !== schoolDemographicsView && !schoolNavView.pop(schoolDemographicsView)) {
							schoolNavView.push(schoolDemographicsView);
						}
					}
					schoolNavView.setMasked(false);
				}
			});
		});
	},
	
	showMapSchool: function(code) {
		this.pushSchoolDetailToNavigationView(code, this.getMapsNavigationView());
	},
	
	pushSchoolDetailToNavigationView: function(code, navigationView, nextScreenCallback) {
		var schoolDetailView = this.getSchoolDetailView(),
			schoolDetailStore = Ext.getStore('SchoolDetails');
		
		schoolDetailView.setMasked({
			xtype: 'loadmask',
			message: 'Loading School&hellip;'
		});
		
		schoolDetailStore.load({
				url: '/' + code,
				callback: function(records, operation, success) {
					if(success && records.length > 0) {
						schoolDetailView.setSchoolDetail(records[0]);
						if(nextScreenCallback) {
							nextScreenCallback(records[0]);
						}
					}
					schoolDetailView.setMasked(false);
				}
		});
		
		if(navigationView.getActiveItem() !== schoolDetailView && !navigationView.pop(schoolDetailView))
		{
			navigationView.push(schoolDetailView);
		}
	},
	
	showSchoolMap: function(code) {
		var me = this,
//			schoolNavView = me.getSchoolsNavView(),
			schoolNavView = me.getMainTabPanel().getActiveItem(),
			singleSchoolMapView = me.getSingleSchoolMapView();
		
		me.pushSchoolDetailToNavigationView(code, schoolNavView, function(record) {
			singleSchoolMapView.setSchoolDetail(record);
			if(schoolNavView.getActiveItem() !== singleSchoolMapView && !schoolNavView.pop(singleSchoolMapView)) {
				schoolNavView.push(singleSchoolMapView);
			}
		});
	},
	
	// event handlers
	onSchoolsListViewActivate: function() {
		this.pushPath('');
	},
	
	onSchoolSelected: function(list, index, target, record){
		this.redirectTo('schools/' + record.get('code'));
	},
	
	onClosedSchoolSelected: function(list, index, target, record){
		this.redirectTo('closedschools/' + record.get('code'));
	},
	
	onMapRender: function(senchaMap, map) {
		this.showSchools(true, true, senchaMap, map);
	},
	
	showSchools: function(showOpen, showClosed, senchaMap, map) {
		var	me = this,
			mainTabPanel = this.getMainTabPanel(),
			openSchoolLatlngs = mainTabPanel.getOpenSchoolLatlngs(),
			closedSchoolLatlngs = mainTabPanel.getClosedSchoolLatlngs(),
			mapsNavigationView = this.getMapsNavigationView(),
			latlngbounds, i = 0, marker, openSchoolMarkers = [], closedSchoolMarkers = [];
		
		senchaMap.setMapCenter({latitude:39.9529, longitude:-75.1602});
		
		latlngbounds = new google.maps.LatLngBounds();
		if(showOpen) {
			for(i = 0; i < openSchoolLatlngs.length; i++) {
				var loc = openSchoolLatlngs[i].loc,
					code = openSchoolLatlngs[i].code;
					
			   latlngbounds.extend(loc);
			   marker = new google.maps.Marker({
	                position: loc,
	                map: map,
	                icon: 'http://' + location.hostname + '/app/PhillySchools/resources/images/open_school.png',
	                code: code
	            });
				openSchoolMarkers.push(marker);
				google.maps.event.addListener(marker, 'mousedown', function(){
					me.redirectTo('maps/' + this.code);
				});
			}
			mainTabPanel.setOpenSchoolMapMarkers(openSchoolMarkers);
		}
		if(showClosed) {
			for(i = 0; i < closedSchoolLatlngs.length; i++) {
				var loc = closedSchoolLatlngs[i].loc,
					code = closedSchoolLatlngs[i].code;
			   
			   latlngbounds.extend(loc);
			   marker = new google.maps.Marker({
	                position: loc,
	                map: map,
	                icon: 'http://' + location.hostname + '/app/PhillySchools/resources/images/closed_school.png',
	                code: code
	            });
				closedSchoolMarkers.push(marker);
				google.maps.event.addListener(marker, 'mousedown', function(){
					me.redirectTo('maps/' + this.code);
				});
			}
			mainTabPanel.setClosedSchoolMapMarkers(closedSchoolMarkers);
		}
		map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds); 
	},
	
	onMapSegmentedButtonToggle: function(segmentedButton, button, isPressed) {
		var	mainTabPanel = this.getMainTabPanel(),
			openSchoolMarkers = mainTabPanel.getOpenSchoolMapMarkers(),
			closedSchoolMarkers = mainTabPanel.getClosedSchoolMapMarkers(),
			senchaMap = this.getSchoolsMap(),
			map = senchaMap.getMap();
			
		if(openSchoolMarkers) {
		    Ext.Array.each(openSchoolMarkers, function(item, index, collection) {
		        item.setMap(null);
		    });
		    mainTabPanel.setOpenSchoolMapMarkers([]);
		}
		if(closedSchoolMarkers) {
		    Ext.Array.each(closedSchoolMarkers, function(item, index, collection) {
		        item.setMap(null);
		    });
		    mainTabPanel.setClosedSchoolMapMarkers([]);
		}
		
		if(button.getText() == 'All') {
			this.showSchools(true, true, senchaMap, map);
		}
		else if(button.getText() == 'Open') {
			this.showSchools(true, false, senchaMap, map);
		}
		else if(button.getText() == 'Closed') {
			this.showSchools(false, true, senchaMap, map);
		}
	},
	
	onShowSchoolDetailButtonTap: function() {
		var schoolDetailView = this.getSchoolDetailView(),
			record = schoolDetailView.getSchoolDetail();
			
//		this.redirectTo('schools/' + record.get('code') + '/map');
//		TODO Fix url routing, but for now use generic method that will push map on whatever nav is active
		this.showSchoolMap(record.get('code'));
	},
	
	onSingleSchoolMapRender: function(mapView, map) {
		var schoolDetail = mapView.getSchoolDetail();
		
		mapView.updateSchoolDetail(schoolDetail);
	},
	
	onShowSchoolDetailDemographicsButtonTap: function() {
		var schoolDetailView = this.getSchoolDetailView(),
			record = schoolDetailView.getSchoolDetail();
			
//		this.redirectTo('schools/' + record.get('code') + '/demographics');
//		TODO Fix url routing, but for now use generic method that will push demographics on whatever nav is active
		this.showSchoolDemographics(record.get('code'));
	}
});