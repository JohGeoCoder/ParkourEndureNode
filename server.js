var express = require('express'), 
			bodyParser = require('body-parser'),
			app = express();

var MongoStore = require('connect-mongo')(express);

var mongo = require('mongoskin')
var db = mongo.db('mongodb://localhost:27017/pkendure');
ObjectID = mongo.ObjectID;

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.use(express.session({
	store: new MongoStore({
		url: 'mongodb://localhost:27017/pkendure',
		ttl: 7*24*60*60,
		autoRemove: 'interval',
		autoRemoveInterval: 10 //Minutes
	}),
	secret: '1234567890'
}));

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
	

app.route('/api/mailing-list/:emailId')
	.delete(function(req, res){
		db.collection('emailList').remove({'_id': new ObjectID(req.params.emailId)}, function(err, result){
			if(err){
				throw result;
			} else {
				res.json({result: 'success'});
			}
		});
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(80);