Ext.define('PhillySchools.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'maintabpanel',
    
    requires: [
        'Ext.TitleBar'
    ],
    config: {
		openSchoolMapMarkers: null,
		closedSchoolMapMarkers: null,
		openSchoolLatlngs: null,
		closedSchoolLatlngs: null,
        items: [
            {
                xtype: 'navigationview',
                itemId: 'schoolsNavView',
                title: 'Schools',
                iconCls: 'home',
                items: [
                    {
                        xtype: 'list',
                        itemId: 'schoolsList',
                        title: 'Schools',
                        indexBar: true,
                        grouped: true,
                        itemTpl: [
                            '<div>{name}</div>'
                        ],
                        store: 'Schools'
                    }
                ]
            },
            {
                xtype: 'navigationview',
                title: 'Closed Schools',
                itemId: 'closedSchoolsNavView',
                iconCls: 'delete',
                items: [
                    {
                        xtype: 'list',
						itemId: 'closedSchoolsList',
						title: 'Closed Schools',
                        itemTpl: [
                            '<div>{name}</div>'
                        ],
                        store: 'ClosedSchools'
                    }
                ]
            },
            {
                xtype: 'navigationview',
                itemId: 'mapsNavigationView',
                title: 'Map',
                iconCls: 'maps',
                items: [
                    {
		                xtype: 'container',
		                title: 'Map',
		                iconCls: 'maps',
		                layout: {
		                    type: 'fit'
		                },
		                items: [
		                    {
		                        xtype: 'map',
		                        itemId: 'schoolsMap',
                                title: 'Map',
                                useCurrentLocation : true,
                                mapOptions: {
									zoomControl: false,
									panControl: false,
									rotateControl: false,
									streetViewControl: false,
									mapTypeControl: false,
									zoom: 13,
									center: new google.maps.LatLng(39.9529, -75.1602)
								},
								geo: {
									autoUpdate: false
								}
                            },
		                    {
		                        xtype: 'segmentedbutton',
		                        docked: 'bottom',
		                        layout: {
		                            pack: 'center',
		                            type: 'hbox'
		                        },
		                        items: [
		                            {
		                                xtype: 'button',
		                                pressed: true,
		                                text: 'All'
		                            },
		                            {
		                                xtype: 'button',
		                                text: 'Open'
		                            },
		                            {
		                                xtype: 'button',
		                                text: 'Closed'
		                            }
		                        ]
		                    }
		                ]
                    }
                ]
            },
//            {
//                xtype: 'navigationview',
//                title: 'Search',
//                iconCls: 'search',
//                navigationBar: {
//                    docked: 'top'
//                },
//                items: [
//                    {
//                        xtype: 'formpanel',
//                        title: 'Search',
//                        items: [
//                            {
//                                xtype: 'textfield',
//                                label: 'School Name',
//                                labelWidth: '45%'
//                            },
//                            {
//                                xtype: 'selectfield',
//                                label: 'Grade Level',
//                                labelWidth: '45%'
//                            },
//                            {
//                                xtype: 'button',
//                                iconCls: 'search',
//                                text: 'Search'
//                            }
//                        ]
//                    }
//                ]
//            },
            {
                xtype: 'container',
                title: 'About',
                iconCls: 'info',
                styleHtmlContent: true,
                html: '<div class="about"><p>Philly Scools is a mobile application developed during Random Hacks for Kidness Philly #5.</p>'
                	+ '<p>Special thanks to <a href="https://github.com/mheadd">Mark Headd</a> for making the Schools API avaliable.</p>'
					+ '<p><a class="button" href="http://www.rhok.org/event/philadelphia" target="_blank">Learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;More&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here</a></p>'
					+'<a class="jarvus" href="http://jarv.us" target="_blank">Mobile app made by <img width="100%" src="resources/images/jarvusLogo.png" alt="jarvusLogo" width="" height="" /> </a></div>'
            }
        ],
        tabBar: {
            docked: 'bottom'
        }

        
        
    }
});
