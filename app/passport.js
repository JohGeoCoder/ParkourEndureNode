var User = require('./models/user.js');

module.exports = function(db, passport) {

	passport.use(new passport.Strategy( 
		{
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {

			var user = User.findUser(db, username);

			if(!user){
				return done(null, false, { message: 'Incorrect username.' });
			}

			if(!User.validPassword(password, user.passhash)){
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		}
	));

	passport.serializeUser(function(user, done) {
	  done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {
		var user = User.findUser(db, username);

		if(!user){
			done(new Error('Could not deserialize user.'), null);
		} else{
			done(null, user);
		}
	});

};
