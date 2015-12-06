var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongo = require('mongoskin');

var app = express();

/* Set the Passport Strategy */
passport.Strategy = require('passport-local').Strategy;

/* Connect to the database */
var configDB = require('./config/database.js');
var db = mongo.db(configDB.url);

/* Initialize the session */
var sessionConfig = require('./config/session.js');
var MongoStore = require('connect-mongo')(session);
app.use(session({
	genid: function(req){
		return genuuid();
	},
	store: new MongoStore({
		url: configDB.url,
		ttl: 7 * 24 * 60 * 60,
		autoRemove: 'native'
	}),
	resave: false,
	saveUninitialized: false,
	secret: sessionConfig.secretKey
}));

/* Declare the parsing method and components location */
app.use(bodyParser.json());
app.use(express.static('./bower_components'));

/* Include the routes */
require('./app/routes.js')(app, db, passport, mongo);

/* Include the Passport authentication */
require('./app/passport.js')(db, passport);

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

/* Start listening on port */
app.listen(80);