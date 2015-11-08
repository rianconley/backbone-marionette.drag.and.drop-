define(['jquery',
	'backbone',
	'backbone.marionette', 
	'underscore',
	'./cardview'],
	function ($, Backbone, Marionette, _,CardView) {

		return Backbone.Marionette.CompositeView.extend({
			tagName: 'ul',
			template : '#grid-template',
			childView: CardView,
			initialize : function(options) {
			   this.listenTo(this.collection, 'change', this.render);
			   
			},
			events: {
				'click #sortAsc': 'sortAsc',
				'click #sortDesc': 'sortDesc'
			},
			sortAsc:function(e){
				this.collection.sortAsc();
			},
			sortDesc:function(e){
				this.collection.sortDesc();
			},
		 
	});
})