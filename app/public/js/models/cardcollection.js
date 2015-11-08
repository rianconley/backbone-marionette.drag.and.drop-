
define( [ 'jquery', 
		  'underscore', 
		  'backbone', 
		  'backbone.localStorage',
		  'public/js/models/cardmodel' ], 
		  function($, _, Backbone,LocalStorage,CardModel) {

	/**
	 * Represents a single business card.
	 */
return Backbone.Collection.extend({
		model : CardModel,
		localStorage: new LocalStorage("cards"),
		initialize: function() {
		  this.on('change', this.sort);

		},
		//default comparator
		comparator: function(m) { 
			return m.get('id'); 
		},
		sortAsc: function(m) { 
			this.comparator= function(m){return m.get('id')};  
			this.sort();
		},
		sortDesc: function(m) { 	
			this.comparator= function(m){return -m.get('id')};  
			this.sort();
		},

	})
		
});
