Ext.define('PhillySchools.store.SchoolDemographicsChart', {
    extend: 'Ext.data.Store',
  
    config: {
	    storeId: 'SchoolDemographicsChart',
        fields: ['demographic', 'population'],
        data: [],
        sorters: 'population desc'
    }
});