Ext.define('PhillySchools.store.SchoolDemographics', {
    extend: 'Ext.data.Store',

	requires: [
        'PhillySchools.model.SchoolDemographics',
        'PhillySchools.proxy.APIProxy'
    ],

    config: {
        model: 'PhillySchools.model.SchoolDemographics',
        storeId: 'SchoolDemographics',
        proxy: {
            type: 'api',
            url: ''
        },
        sorters: 'year'
    }
});