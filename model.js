var PersonModel = Backbone.Model.extend({
	initialize: function() {
	console.log('PersonModel has been constructed!')
	},

});

var PersonCollection = Backbone.Collection.extend({
	model: PersonModel,
	url: '/returnCollection',
	initialize: function(){
		console.log('PersonCollection!!')
	}
});

