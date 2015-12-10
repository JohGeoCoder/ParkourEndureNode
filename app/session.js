var crypto = require('crypto');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var sessionConfig = require('./../config/sessionConfig.js');
var flash = require('connect-flash');

module.exports = function(app, express, passport, db) {
	
	require('./../config/passport')(passport);
	var MongoStore = require('connect-mongo')(expressSession);

	app.use(express.static('./bower_components'));
	
	/* Declare the parsing method and components location */
	app.use(bodyParser.json());

	app.use(expressSession({
		genid: function(req){
			var uuid = genUuid();
			console.log(uuid);
			return uuid;
		},
		store: new MongoStore({
			db: db,
			ttl: 7 * 24 * 60 * 60,
			autoRemove: 'native'
		}),
		resave: false,
		saveUninitialized: false,
		secret: sessionConfig.secretKey
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
};

function genUuid(callback) {
	if (typeof(callback) !== 'function') {
		return uuidFromBytes(crypto.randomBytes(16));
	}

	crypto.randomBytes(16, function(err, rnd) {
		if (err) return callback(err);
		callback(null, uuidFromBytes(rnd));
	});
}

function uuidFromBytes(rnd) {
	rnd[6] = (rnd[6] & 0x0f) | 0x40;
	rnd[8] = (rnd[8] & 0x3f) | 0x80;
	rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
	rnd.shift();
	return rnd.join('-');
}