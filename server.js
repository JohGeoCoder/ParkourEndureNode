var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var MongoStore = require('connect-mongo')(session);

var mongo = require('mongoskin')
var db = mongo.db('mongodb://localhost:27017/pkendure');
ObjectID = mongo.ObjectID;

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({ username: username }, function(err, user){
			if(err) { return done(err); }
			if(!user){
				return done(null, false, { message: 'Incorrect Username.' });
			}

			if(!user.validPassword(password)) {
				return done(null, false, { message : 'Incorrect password.' });
			}

			return done(null, user);
		});
	}
));

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.use(session({
	genid: function(req){
		return genuuid();
	},
	store: new MongoStore({
		url: 'mongodb://localhost:27017/pkendure',
		ttl: 7*24*60*60,
		autoRemove: 'native'
	}),
	resave: false,
	saveUninitialized: false,
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

app.post('/login', 
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/coaches',
		failureFlash: false
	})
);

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(80);