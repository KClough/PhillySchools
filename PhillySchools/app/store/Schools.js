Ext.define('PhillySchools.store.Schools', {
    extend: 'Ext.data.Store',

	requires: [
        'PhillySchools.model.School',
        'PhillySchools.proxy.APIProxy'
    ],

    config: {
        model: 'PhillySchools.model.School',
        storeId: 'Schools',
        proxy: {
            type: 'api',
			url: ''
        },
        sorters: 'name',
        grouper: {
	       groupFn: function(record) {
	           return record.get('name')[0];
	       }
	   }
    }
});