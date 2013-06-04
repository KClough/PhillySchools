Ext.define('PhillySchools.view.SchoolDetail', {
    extend: 'Ext.Container',
	xtype: 'schooldetailview',
    config: {	
		schoolDetail: null,
		title: 'Information',
        layout: {
            type: 'vbox'
        },
        scrollable: 'vertical',
        items: [
            {
                xtype: 'container',
                itemId: 'schoolInfoCt',
                cls: 'school-info',
                styleHtmlContent: true,
                tpl: [
					'<h1 class="school-name">{name}</h1>',
					'<h2 class="school-level">{level}</h2>',
					'<p class="school-address">',
						'<span class="school-street">{address}</span>',
						'<tpl if="zip">, <span class="school-zip">{zip}</span></tpl>',
					'<tpl if="phone_number">',
						'<p class="school-phone"><a href="tel:+{phone_number}">{phone_number_formatted}</a></p>',
					'</tpl>',
					'<tpl if="url">',
						'<p class="school-url"><a href="{url}">Visit Website</a></p>',
					'</tpl>'
				]
			},
			{
           		xtype: 'container',
           		cls: 'school-actions',
           		defaults: {
           			xtype: 'button',
	           		// iconMasked: true
           		},
           		items: [
		           	{
		                text: 'Show Map',
		                action: 'showMap',
		                //iconCls: 'locate4'
		            },
		            {
		                text: 'Show Demographics',
		                action: 'showDemographics',
		                //iconCls: 'team'
		            },
		            {
		                text: 'Show Enrollment',
		                action: 'showEnrollment',
		                //iconCls: 'chart2',
		                disabled: true
		            },
		            {
		                text: 'Show Test Scores',
		                action: 'showTestScores',
		                //iconCls: 'bulb',
		                disabled: true
		            },
		            {
		                text: 'Show Budget',
		                action: 'showBudget',
		                //iconCls: 'piechart',
		                disabled: true
		            }
	            ]
	        }
//          TODO add charts once I Get all data on one request
//            {
//                xtype: 'container',
//                height: '300px',
//                layout: {
//                    type: 'fit'
//                },
//                items: [
//                    {
//                        xtype: 'polar',
//                        colors: [
//                            '#115fa6',
//                            '#94ae0a',
//                            '#a61120',
//                            '#ff8809',
//                            '#ffd13e',
//                            '#a61187',
//                            '#24ad9a',
//                            '#7c7474',
//                            '#a66111'
//                        ],
//                        series: [
//                            {
//                                type: 'pie3d',
//                                field: 'y'
//                            }
//                        ],
//                        interactions: [
//                            {
//                                type: 'rotatePie3d'
//                            }
//                        ]
//                    }
//                ]
//            }
        ]
    },
    
    updateSchoolDetail: function(schoolDetail) {
		this.down('#schoolInfoCt').setData(schoolDetail.data);
    }
});