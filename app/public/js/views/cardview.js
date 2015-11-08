define(['jquery',
	'backbone',
	'backbone.marionette', 
	'underscore'],
	function ($, Backbone, Marionette, _) {

		return Backbone.Marionette.ItemView.extend({
			tagName: 'li',
			template : '#card-template',
		  	className: 'col-md-6 col-lg-4',
		  	initialize : function(options) {
			   
			},
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
				dragSrcEl = e.target;
				this.model.collection.draggedModel = this.model;
				e.originalEvent.dataTransfer.effectAllowed = 'move';
				//e.originalEvent.dataTransfer.setData('text',this.model.id);
			},
			handleDragOver:function(e) {
				if (e.preventDefault) {
					e.preventDefault(); // Necessary. Allows us to drop.
				}
				this.model.collection.draggedOver = this.model;
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
				var idDragged=this.model.collection.draggedModel.get('id');
				var idDropped=this.model.collection.draggedOver.get("id");
				//console.log(idDragged,idDropped);
				
				this.model.collection.draggedModel.set('id',idDropped).save();
				this.model.collection.draggedOver.set('id',idDragged).save();
		            collection.trigger("change");

				//this.trigger("update:sort");
				return false;
			},
			handleDragEnd:function(e){
				e.target.style.opacity = '1';
				//console.log("bees");
			},
		  
		});


})