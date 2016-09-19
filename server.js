module.exports = function(){
	var express  = require('express');
	var app      = express();
	var port     = process.env.PORT || 80;
	var passport = require('passport');
	var flash    = require('connect-flash');
	//var winston  = require('winston');

	var morgan       = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser   = require('body-parser');
	var session      = require('express-session');	

	//app.use(morgan('dev')); // log every request to the console
	var pug = require('pug');
	app.set('view engine', 'pug');
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	}));

	var sessionConfig = require('./config/sessionConfig.js');
	app.use(session({
		secret: sessionConfig.secretKey,
		resave: false,
		saveUninitialized: false
	}));

	require('./config/passport')(passport);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.use(express.static('./bower_components'));
	app.use(express.static('./static'));

	var configDB = require('./config/database.js');
	var Sequelize = require('sequelize');
	var connection = new Sequelize(configDB.dbName, configDB.username, configDB.password, {
		host: configDB.host,
		port: configDB.port,
		dialect: configDB.dialect
	});

	connection.authenticate().then(function(err){
		if(err){
			console.log('Connection ERROR');
		} else{
			console.log('Connection SUCCESS');
		}
	}).catch(function(err){
		console.log("Unable to connect to the database", err);
	});

	var models = require('./app/ModelInitializer.js')(connection, Sequelize);

	/* Include the routes */
	require('./app/routes.js')(app, models);
	require('./app/api.js')(app, models);

	app.get('*', function(req, res){
		res.sendFile(__dirname + '/static/index.html');
	});

	/* Start listening on port */
	app.listen(port);
};

