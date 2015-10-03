var express = require('express');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var pretty = require('prettyjson')

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/main.html')
})

app.get('/returnCollection', function(req, res){
	console.log('Get request to database')
	knex('person').select('*')
		.then(function(result){
			console.log(result)

			res.send(result)
		})
})

app.post('/returnCollection', function (req, res){
	knex('person').insert({name: req.body.name}).returning("id")	
		.then(function(result){
			console.log('Post request to server result', result)
			console.log('result at index 0', result[0])
			console.log('bout to send back! son!')
			res.send({id: result[0]})
		})
})

app.listen(3000)