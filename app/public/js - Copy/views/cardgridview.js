define(['jquery',
	'backbone',
	'backbone.marionette', 
	'underscore',
	'cardview'
	function ($, Backbone, Marionette, _,CardView) {

		return Backbone.Marionette.CompositeView.extend({
			tagName: 'ul',
			template : '#grid-template',
			childView: CardView,
			initialize : function(options) {
			   this.listenTo(this.collection, 'change', this.render);
			   this.model = new Backbone.Model();
			}
		 
	});
})