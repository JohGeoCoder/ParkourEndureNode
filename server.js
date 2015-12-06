var express = require('express');
var passport = require('passport');
var mongo = require('mongoskin');

var app = express();

/* Set the Passport Strategy */
passport.Strategy = require('passport-local').Strategy;

/* Connect to the database */
var configDB = require('./config/database.js');
var db = mongo.db(configDB.url);

/* Initialize the session */
require('./app/session.js')(app, express, passport, db);

/* Include the routes */
require('./app/routes.js')(app, db, passport, mongo);

/* Include the Passport authentication */
require('./app/passport.js')(db, passport);

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

/* Start listening on port */
app.listen(80);