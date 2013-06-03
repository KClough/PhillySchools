Ext.define('PhillySchools.model.SchoolDetail', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'name',
                mapping: 'school_name_1'
            },
            {
                name: 'code',
                mapping: 'school_code'
            },
            {
                name: 'address'
            },
            {
                name: 'zip',
                mapping: 'school_zip'
            },
            {
                name: 'phone_number'
            },
            {
				name: 'phone_number_formatted',
				convert: function(v,r) {
					return r.get('phone_number').replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
				}
            },
            {
                name: 'url',
                mapping: 'hpaddr'
            },
            {
                name: 'latitude',
                type: 'float'
            },
            {
                name: 'longitude',
                type: 'float'
            },
            {
				name: 'level',
				mapping: 'school_level_name'
            }
        ]
    }
});