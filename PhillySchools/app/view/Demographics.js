Ext.define('PhillySchools.view.Demographics', {
    extend: 'Ext.Container',
	xtype: 'demographicsview',
	
	requires: [
        'PhillySchools.view.DemographicChart'
    ],
    config: {	
		demographics: null,
		title: 'Demographics',
        layout: {
            type: 'fit'
        },
//        scrollable: 'vertical',
        items: [
            {
				xtype: 'demographicchart'
            },
            {
				xtype: 'dataview',
				docked: 'bottom',
				itemId: 'demographicsDataView',
				itemTpl: [
					'<tpl if="population &gt; 0">',
						'<p>',
							'<span style="background-color:{[this.colors[xindex]]}">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
							'{demographic}: {population}',
						'</p>',
					'</tpl>',
					{
						colors: [
				            '#115fa6',
				            '#94ae0a',
				            '#a61120',
				            '#ff8809',
				            '#ffd13e',
				            '#a61187',
				            '#24ad9a',
				            '#7c7474',
				            '#a66111'
				        ]
					}],
				store: 'SchoolDemographicsChart',
				scrollable: null
            }
        ]
    },
    updateDemographics:function(data) {
//		this.down('#demographicsDataView').setData(data);
    }
});