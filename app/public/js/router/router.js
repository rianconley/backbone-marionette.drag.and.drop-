define(['jquery', 'backbone', 'backbone.marionette', 'underscore'], 
    function ($, Backbone, Marionette, _) {

    	return Marionette.AppRouter.extend({
		routes: {
		 '': 'home'
		},

		home: function() {
			this.navigate('cards', {
			trigger: true,
			replace: true
			});
		}
	});


})