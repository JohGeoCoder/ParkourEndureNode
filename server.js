var express = require('express'), 
			bodyParser = require('body-parser'),
			app = express();

var db = require('mongoskin').db('mongodb://localhost:27017/pkendure');

var coachId = 1;
var coachData = {
	1: { id: 1, firstName: 'John' , lastName: 'George', imageUrl: '../img/pkCoachJohn.png', details: 'John began practicing parkour in 2005 when parkour coaching in the United States was almost non-existent. He began coaching in 2009 during his time at Bloomsburg University of Pennsylvania, and earned his Level 1 ADAPT coaching qualification in 2011. In 2015 John took the intensive 5-day Level 2 ADAPT coaching qualification, and is actively training for the Level 2 assessments.'},
};

var carouselItemId = 3;
var carouselData = {
	1: { id: 1, type: 'Q', quote: "You don't stop running because you get old, you get old because you stop running.", attribution: "Christopher McDougall", imageUrl: ""},
	2: { id: 2, type: 'Q', quote: "Once you learn Parkour's basic moves, the world around you changes", attribution: "Christopher McDougall", imageUrl: ""},
	3: { id: 3, type: 'Q', quote: "Whether you're a beginner or have been in the trenches for years, your primary goal as far as physical training goes should be to become stronger.", attribution: "Chris Rowat", imageUrl: ""},
};

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.route('/api/coaches')
	.get(function(req, res){
		db.collection('coaches').find().toArray(function(err, result){
			if(err) throw err;
			res.json(result);
		});
	})
	.post(function(req, res){
		var record = req.body;
		record.id = ++coachId;
		coachData[record.id] = record;
		res.json(record);
	});

app.route('/api/coaches/:id')
	.get(function(req, res){
		res.json(coachData[req.params.id]);
	})
	.put(function(req, res){
		coachData[req.params.id] = req.body;
		res.json(req.body);
	})
	.delete(function(req, res){
		delete coachData[req.params.id];
		res.json(null);
	});

app.route('/api/carousel')
	.get(function(req, res){
		res.json(Object.keys(carouselData).map(function(key){
			return carouselData[key];
		}));
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(80);