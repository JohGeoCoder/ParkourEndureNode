var express = require('express'), 
			bodyParser = require('body-parser'),
			app = express();

var db = require('mongoskin').db('mongodb://localhost:27017/pkendure');

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
		db.collection('carouselItems').find().toArray(function(err, result){
			if(err) throw err;
			res.json(result);
		});
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(80);