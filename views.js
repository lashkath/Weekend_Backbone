var PersonView = Backbone.View.extend({
	tagName: 'p',
	className: 'person',
	initialize: function() {
		this.render();
	},
	render: function() {
		console.log(this.model.get('name'));
		console.log(this.model.get('id'));
		this.$el.html(this.model.get('name') + this.model.get('id'));
		this.$el.appendTo('.collection');	
	}	
})

var PersonCollectionView = Backbone.View.extend({
	tagName: 'section',
	className: 'collection',
	initialize: function() {
		var self = this;
		this.collection.fetch( { success: function(){ self.render(); } } );
		self.$el.appendTo('body');
		// this.listenTo(this.collection, 'add', this.render())
		// this.collection.on('add', function(){console.log('on add')}, this)
		this.collection.on('sync', function(){console.log('on sync')}, this)
	},
	render: function() {
		this.$el.empty();
		var $form = $('<form>');
		var $input = $('<input type="text" placeholder="New Person">');
		var $submitBtn = $('<button type="submit">').html('Submit');
		$form.append([$input, $submitBtn]);
		$form.appendTo(this.$el);
		console.log('length of collection: ', this.collection.length)
		this.collection.forEach(function(person){
			console.log('render in PersonCollectionView', person)
			new PersonView({
				model: person
			})
		})
		
	},
	events: {
		"click button" : "addPerson"
	},
	addPerson: function (e) {
		e.preventDefault();
		console.log($('input').val())
		var self = this
		this.collection.create({name: ($('input').val())}, {success: function(){self.render()}})
		// this.render();
	}
})