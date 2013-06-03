Ext.define('PhillySchools.model.School', {
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
                name: 'level',
                mapping: 'school_level_name'
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
            }
        ]
    }
});