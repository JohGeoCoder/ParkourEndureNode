var express = require('express'), 
			bodyParser = require('body-parser'),
			app = express();

var db = require('mongoskin').db('mongodb://localhost:27017/pkendure');

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.route('/api/coaches')
	.get(function(req, res){
		db.collection('coaches').find().toArray(function(err, result){
			if(err){
				throw err;
			} else{
				res.json(result);
			}
		});
	})
	.post(function(req, res){
		var record = req.body;
		res.json(record);
	});

app.route('/api/carousel')
	.get(function(req, res){
		db.collection('carouselItems').find().toArray(function(err, result){
			if(err){
				throw err;
			} else{
				res.json(result);
			}
			
		});
	});

app.route('/api/mailing-list')
	.post(function(req, res){
		db.collection('emailList').insert({email: req.body['email']}, function(err, result) {
			if(err){
				throw result;
			}
			else{
				res.json(result[0]);
			}
		});
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(80);