define(['jquery',
	'backbone',
	'backbone.marionette', 
	'underscore'],
	function ($, Backbone, Marionette, _){
		var incId;
		return Backbone.Marionette.ItemView.extend({

			template: '#tpl-new-card',
			initialize : function(options) {
			   $('#container-add').css({"display":"block"}).animate({"height":"400px"})
			   incId=options.id;
			},
			ui: {
				nameInput: '.card-name-input',
				telInput: '.card-tel-input',
				emailInput: '.card-email-input'
			},
			events: {
			    'submit #newCardForm': 'onFormSubmit',
			     'click .form-cancel-btn': 'onCancel'
			},
			//form submitted callback
			onFormSubmit: function(e) {
				e.preventDefault();
				$('#container-add').css({"display":"none"}).animate({"height":"0px"})
				//this.model.set('id','20');
				this.trigger('form:submitted', {
					id:incId,
					name: this.ui.nameInput.val(),
					tel: this.ui.telInput.val(),
					email: this.ui.emailInput.val(),
					avatar:'ProfilePlaceholder250x250'
				});
		  	},
		  	onCancel:function(e){
		  		$('#container-add').css({"display":"none"}).animate({"height":"0px"})

		  	}
		})
})