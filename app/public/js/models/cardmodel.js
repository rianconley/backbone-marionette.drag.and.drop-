/**
 * Modular Grid Row  definition.
 */
define(['jquery', 
        'underscore', 
        'backbone'], 
        function($, _, Backbone) {

    /**
     * Represents a single business card.
     */
     /*
	var inc=function(lastid){
		var counter = 6;
		return function plus() { return counter += 1;}
		plus();    
		return counter;
	}
	*/

    // var delegate = inc;
   	 return Backbone.Model.extend({
   	 	initialize: function (){
   	 		
   	 	},
            defaults: {
                id: null,
                name: null,
                tel: null,
                email: null,
                avatar: null
            }
    });
});
