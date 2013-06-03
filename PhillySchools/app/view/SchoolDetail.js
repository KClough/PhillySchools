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
                styleHtmlContent: true,
                tpl: [
					'<p>{name}</p>',
					'<p>{level}</p>',
					'<p>{address}</p>',
					'<p>{zip}</p>',
					'<tpl if="phone_number">',
						'<p><a href="tel:+{phone_number}">{phone_number_formatted}</a></p>',
					'</tpl>',
					'<tpl if="url">',
						'<p><a href="{url}">Visit Website</a></p>',
					'</tpl>'
				]
            },
           {
				xtype: 'button',
                text: 'Show Map',
                action: 'showMap'
            },
            {
				xtype: 'button',
                text: 'Show Demographics',
                action: 'showDemographics'
            },
            {
            	xtype: 'button',
                text: 'Show Enrollment',
                action: 'showEnrollment',
                disabled: true
            },
            {
				xtype: 'button',
                text: 'Show Standardized Test Scores',
                action: 'showTestScores',
                disabled: true
            },
            {
				xtype: 'button',
                text: 'Show Budget',
                action: 'showBudget',
                disabled: true
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