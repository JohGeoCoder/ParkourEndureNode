var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

/*var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;*/

var app = express();

var MongoStore = require('connect-mongo')(session);

var mongo = require('mongoskin');

var configDB = require('./config/database.js');
var db = mongo.db(configDB.url);

ObjectID = mongo.ObjectID;

/*passport.use(new LocalStrategy(
	function(username, password, done){
		console.log(username);
		console.log(password);
		console.log(done);
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
));*/

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

/*app.use(session({
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
}));*/

require('./app/routes.js')(app, db);

app.listen(80);