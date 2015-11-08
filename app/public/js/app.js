define(['jquery',
	'backbone',
	'backbone.marionette', 
	'underscore',
	'public/js/models/cardcollection',
	'public/js/router/router',
	'public/js/controllers/controller'], 
	function ($, Backbone, Marionette, _,CardCollection,Router,Controller) {

    	App = new Backbone.Marionette.Application();
    	App.addRegions({mainRegion:"#container-view"});
    	App.addRegions({addRegion:"#container-add"});

    	App.addInitializer(function () {
		var cards = new CardCollection(),
		router = new Router(),
		//set options for controller
		controller = new Controller({
			//collection
			cards: cards,
			router: router,
			mainRegion: this.mainRegion
		});
		//add routes at runtime
		router.processAppRoutes(controller, {
				'cards': 'showCards',
				'cards/new': 'newCard',
			});

	});

	App.on('start', function(options){
	  if (Backbone.history){
	    Backbone.history.start();
	  }
	});

	return App;
        //return App;
    });