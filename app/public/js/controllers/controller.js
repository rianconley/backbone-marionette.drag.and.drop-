define(['jquery', 
	'backbone',
	 'backbone.marionette', 
	 'underscore',
	 '../views/cardgridview',
	 '../views/newcard',
	 '../App',
	'../models/cardmodel'
	 ], 
	function ($, Backbone, Marionette, _,CardGridView,NewCardView,App,CardModel) {
	return  Marionette.Object.extend({
		initialize: function(options) {
			this._router = options.router;
			this._mainRegion = options.mainRegion;
			this._cards = options.cards;
			this._cards.fetch();

			if (this._cards.isEmpty()) {
				this._createSampleData();
			}
		},
		showCards: function (List) {
			//show all cards callback
			var cardsView = new CardGridView({
			collection: this._cards
			});
			App.mainRegion.show(cardsView);
			this._router.navigate('cards');
		},
		newCard: function (Single) {
			//new cards callback
			var newId=this._cards.length+1;
			var newCardModel=new CardModel();
			var cardsView = new CardGridView({
			collection: this._cards
			});
			var newCardForm = new NewCardView({
			model: newCardModel,
			id:newId
			});
			this.listenTo(newCardForm, 'form:submitted', function(attrs) {
			this._cards.create(attrs);
			this.showCards();
			});
			this._router.navigate('cards/new');
			App.addRegion.show(newCardForm);


			App.mainRegion.show(cardsView);
		},


		_createSampleData: function() {
		 _.each([
		   {
		     id: 1,
		     name : 'Terrence S. Hatfield',
		     tel: '651-603-1723',
		     email: 'TerrenceSHatfield@rhyta.com',
		     avatar: 'ProfilePlaceholder250x250'
		   },
		   {
		     id: 2,
		     name : 'Chris M. Manning',
		     tel: '513-307-5859',
		     email: 'ChrisMManning@dayrep.com',
		     avatar: 'ProfilePlaceholder250x250'
		   },
		   {
		     id: 3,
		     name : 'Ricky M. Digiacomo',
		     tel: '918-774-0199',
		     email: 'RickyMDigiacomo@teleworm.us',
		     avatar: 'ProfilePlaceholder250x250'
		   },
		   {
		     id: 4,
		     name : 'Michael K. Bayne',
		     tel: '702-989-5145',
		     email: 'MichaelKBayne@rhyta.com',
		     avatar: 'ProfilePlaceholder250x250'
		   },
		   {
		     id: 5,
		     name : 'John I. Wilson',
		     tel: '318-292-6700',
		     email: 'JohnIWilson@dayrep.com',
		     avatar: 'ProfilePlaceholder250x250'
		   },
		   {
		     id: 6,
		     name : 'Rodolfo P. Robinett',
		     tel: '803-557-9815',
		     email: 'RodolfoPRobinett@jourrapide.com',
		     avatar: 'ProfilePlaceholder250x250'
		   }], function(card) {
		     this._cards.create(card);
		   }, this);
		}



	})

});