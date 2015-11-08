

var DnDApp = DnDApp || {};

(function() { 

"use strict"; 
DnDApp.App = new Backbone.Marionette.Application({models:{},collections:{},views:{}});

DnDApp.App.addRegions({mainRegion:"#container"});

DnDApp.dragSrcEl = null; 
/*views*/
DnDApp.NewCardView=Backbone.Marionette.ItemView.extend({

	template: '#tpl-new-card',

	ui: {
		nameInput: '.name-input',
		telInput: '.tel-input',
		emailInput: '.email-input'
	},
	events: {
	    'submit #newCardForm': 'onFormSubmit'
	},

	onFormSubmit: function(e) {
		console.log("submiited");
		e.preventDefault();

		this.trigger('form:submitted', {
		  name: this.ui.nameInput.val(),
		  tel: this.ui.telInput.val(),
		  email: this.ui.emailInput.val()
		});
  	}
})

DnDApp.CardView = Backbone.Marionette.ItemView.extend({
	tagName: 'li',
	template : '#card-template',
  	className: 'col-md-6 col-lg-4',
  	events: {
		'dragstart .card': 'handleDragStart',
		'dragover .card': 'handleDragOver',
		'dragenter .card': 'handleDragEnter',
		'dragleave .card': 'handleDragLeave',
		'drop .card': 'handleDrop',
		'dragend .card': 'handleDragEnd'
	},

	handleDragStart:function(e){
		e.target.style.opacity = '0.4';
		DnDApp.dragSrcEl = e.target;
		this.model.collection.draggedModel = this.model;
		e.originalEvent.dataTransfer.effectAllowed = 'move';
		//e.originalEvent.dataTransfer.setData('text',this.model.id);
	},
	handleDragOver:function(e) {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
		return false;
	},
	handleDragEnter:function (e) {
	  // this / e.target is the current hover target.
		e.target.classList.add('over');
	},
	handleDragLeave:function(e) {
		e.target.classList.remove('over');  // this / e.target is previous target element.
	},
	handleDrop:function(e){
		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		var collection = this.model.collection;
		//if(DnDApp.dragSrcEl !=e.target ){}
		collection.models.splice(collection.indexOf(this.model.collection.draggedModel), 1);
            collection.models.splice(this.$el.index(), 0, this.model.collection.draggedModel);
            collection.trigger("change");

		//this.trigger("update:sort");
		return false;
	},
	handleDragEnd:function(e){
		e.target.style.opacity = '1';
		//console.log("bees");
	},
  
});

DnDApp.CardGridView = Backbone.Marionette.CompositeView.extend({
	tagName: 'ul',
	template : '#grid-template',
	childView: DnDApp.CardView,
	initialize : function(options) {
	   this.listenTo(this.collection, 'change', this.render);
	   this.model = new Backbone.Model();
	},
	 
});
/*end views*/

/*modelscollections*/
DnDApp.CardModel = Backbone.Model.extend({
	defaults: {
	name: null,
	tel: null,
	email: null,
	avatar: null
	}
});

DnDApp.CardCollection=Backbone.Collection.extend({
	 model : DnDApp.CardModel,
	 localStorage: new Backbone.LocalStorage("cards")
});
/*endmodelscollections*/

/*controller*/

DnDApp.Controller = Marionette.Object.extend({
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
		var cardsView = new DnDApp.CardGridView({
		collection: this._cards
		});
		this.listenTo(cardsView, 'childview:update:sort', function(attrs){
			//console.log(attrs);

		});

		DnDApp.App.mainRegion.show(cardsView);
		this._router.navigate('cards');
	},
	newCard: function (Single) {
		var newCardForm = new DnDApp.NewCardView({
		model: new DnDApp.CardModel()
		});
		this.listenTo(newCardForm, 'form:submitted', function(attrs) {
		this._cards.create(attrs);
		this.showCards();

		});
		this._router.navigate('cards/new');
		DnDApp.App.mainRegion.show(newCardForm);
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
/*controller*/
/*router*/

DnDApp.Router = Marionette.AppRouter.extend({
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

/*router*/
/*app */

/*initialize app*/
DnDApp.App.addInitializer(function () {
	var cards = new DnDApp.CardCollection(),
	router = new DnDApp.Router(),
	//set options for controller
	controller = new DnDApp.Controller({
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


DnDApp.App.on('start', function(options){
  if (Backbone.history){
    Backbone.history.start();
  }
});

DnDApp.App.start();


/*app*/
})();
