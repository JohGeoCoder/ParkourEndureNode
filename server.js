var express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

var id = 2;
var data = {
	1: { id: 1, firstName: 'John' , lastName: 'George', imageUrl: '../img/pkCoachJohn.png', details: 'John began practicing parkour in 2005 when parkour coaching in the United States was almost non-existent. He began coaching in 2009 during his time at Bloomsburg University of Pennsylvania, and earned his Level 1 ADAPT coaching qualification in 2011. In 2015 John took the intensive 5-day Level 2 ADAPT coaching qualification, and is actively training for the Level 2 assessments.'},
};

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.route('/api/coaches')
	.get(function(req, res){
		res.json(Object.keys(data).map(function(key){
			return data[key];
		}));
	})
	.post(function(req, res){
		var record = req.body;
		record.id = ++id;
		data[record.id] = record;
		res.json(record);
	});

app.route('/api/coaches/:id')
	.get(function(req, res){
		res.json(data[req.params.id]);
	})
	.put(function(req, res){
		data[req.params.id] = req.body;
		res.json(req.body);
	})
	.delete(function(req, res){
		delete data[req.params.id];
		res.json(null);
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(3000);