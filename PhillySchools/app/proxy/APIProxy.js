/*jslint browser: true, undef: true *//*global Ext,LOCALE,SCREENS,PhillySchools*/
Ext.define('PhillySchools.proxy.APIProxy', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.api',
	requires: [
		'PhillySchools.API'
	],

	config: {
		noCache: false,
        limitParam: false,
        pageParam: false,
        startParam: false,
		reader: {
			type: 'json'
		}
	},
	
	getUrl: function() {
		var url = this.callParent(arguments);
		return PhillySchools.API.buildUrl(url);
	},
	
	getParams: function(operation) {
		var params = this.callParent(arguments);
		return PhillySchools.API.buildParams(params);
	}
});