/*jslint browser: true, undef: true *//*global Ext,LOCALE,SCREENS*/
Ext.define('PhillySchools.API', {
	extend: 'Ext.util.Observable',
	singleton: true,
	requires: [
		'Ext.Ajax',
		'Ext.MessageBox'
	],
	
	config: {
		/**
		 * Base URL to be prefixed to all API request URLs
		 */
		baseUrl: '/schools'
	},
	
	constructor: function() {
		this.callParent(arguments);
		
		Ext.Ajax.setTimeout(15000);
		Ext.Ajax.on('requestexception', this.onRequestException, this);
	},
	
	/**
	 * Construct a URL that is prefixed with the baseURL
	 */
	buildUrl: function(path) {
		return this.getBaseUrl()+path;
	},
	
	/**
	 * Apply globally-required request parameters
	 */
	buildParams: function(params) {
		params = params || {};
		return params;
	},
	
	/**
	 * Wrapper for Ext.Ajax.request that applies baseURL and base params and json decoding
	 */
	request: function(method, path, params, callback, scope) {
		Ext.Ajax.request({
			url: this.buildUrl(path),
			method: method,
			params: this.buildParams(params),
			scope: this,
			callback: function(options, success, response) {
				// TODO: make server return correct Content-Type
				if(/*response.getResponseHeader('content-type').indexOf('application/json') == 0 &&*/ response.responseText) {
					response.data = Ext.decode(response.responseText, true);
				}

				Ext.callback(callback, scope, [options, success, response]);
			}
		});
	},

	/**
	 * Global request exception handler
	 */
	onRequestException: function(connection, response, options) {
		var me = this;
		
		if(response.status == 500) {
			Ext.Msg.alert('Unable to connect to server. Please try again later.', function() {
				me.fireEvent('logout', true);
			}, this);
		}
		else {
			var errorText = 'Please try again.' // 'An unknown error has occurred. We apologize for any inconvenience. Please try again.',
				loadmask = Ext.Viewport.down('loadmask');
			
			if(response.timedout) {
				errorText = 'Please try again.' // The connection timed out. Please check your data connection quality and try again.';
			}
			
			if(loadmask) {
				loadmask.parent.setMasked(false);
			}
			
			if(response.data && response.data.error && response.data.error.message) {
				errorText = response.data.error.message;
			}
			
			Ext.Msg.show({
				title: 'Network Connection Lost.', // 'Network Failure',
				message: errorText,
				buttons: [{
					xtype: 'spacer'
				},{
					xtype: 'spacer'
				},{
					text: 'Try Again',
					itemId: 'retry',
					ui: 'action'
				},{
					xtype: 'spacer'
				}],
				scope: this,
				fn: function(choice) {
					if(choice == 'retry') {
						Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Retrying&hellip;'});
						
						var removeLoadmask = function() {
							Ext.Viewport.setMasked(false);
						};
						
						options.callback = options.callback ? Ext.Function.createSequence(options.callback, removeLoadmask) : removeLoadmask;
						
						Ext.Function.defer(Ext.Ajax.request, 1000, Ext.Ajax, [options]);
					}
				}
			});
		}
	}
});