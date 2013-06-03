Ext.define('PhillySchools.store.ClosedSchools', {
    extend: 'Ext.data.Store',

    requires: [
        'PhillySchools.model.School'
    ],

    config: {
        model: 'PhillySchools.model.School',
        storeId: 'ClosedSchools',
        proxy: {
            type: 'api',
			url: '/closing'
        },
        sorters: 'name'
    }
});