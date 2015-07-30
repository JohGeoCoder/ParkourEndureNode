var express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

var coachId = 1;
var coachData = {
	1: { id: 1, firstName: 'John' , lastName: 'George', imageUrl: '../img/pkCoachJohn.png', details: 'Teh best coche evar'},
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
		res.json(Object.keys(coachData).map(function(key){
			return coachData[key];
		}));
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