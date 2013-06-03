Ext.define('PhillySchools.store.SchoolDetails', {
    extend: 'Ext.data.Store',

	requires: [
        'PhillySchools.model.SchoolDetail',
        'PhillySchools.proxy.APIProxy'
    ],

    config: {
        model: 'PhillySchools.model.SchoolDetail',
        storeId: 'SchoolDetails',
        proxy: {
            type: 'api',
            url: ''
        },
        sorters: 'name'
    }
});