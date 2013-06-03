Ext.define('PhillySchools.view.DemographicChart', {
    extend: 'Ext.chart.PolarChart',
	xtype: 'demographicchart',
    config: {
		title: 'Demographics',
		store: 'SchoolDemographicsChart',
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
        ],
        animate: {
            duration: 1500,
            easing: 'easeIn'
        },
        series: [
            {
                type: 'pie3d',
                field: 'population',
		        label: {
	                field: 'demographic',   //bind label text to name
	                display: 'rotate', //rotate labels (also middle, out).
	                font: '14px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
	                contrast: true
	            },          
                distortion: 0.7,
                style: {
                    stroke: "white"
                }
            }
        ],
        interactions: [
            {
                type: 'rotatePie3d'
            }
        ]
    }
});