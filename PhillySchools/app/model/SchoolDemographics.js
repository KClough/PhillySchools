Ext.define('PhillySchools.model.SchoolDemographics', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
				name: 'year',
				mapping: 'school_year',
				type: 'int'
            },
            {
				name: 'african_american',
				type: 'float'
            },
            {
				name: 'african_american',
				type: 'float'
            },
            {
				name: 'white',
				type: 'float'
            },
            {
				name: 'asian',
				type: 'float'
            },
            {
            	name: 'latino',
            	type: 'float'
            },
            {
            	name: 'other',
            	type: 'float'
            },
            {
            	name: 'pacific_islander',
            	type: 'float'
            },
            {
            	name: 'american_indian',
            	type: 'float'
            },
            {
            	name: 'low_income_family',
            	mapping: 'sch_low_income_family',
            	type: 'float'
            }
        ]
    }
});