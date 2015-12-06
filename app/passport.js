var User = require('./models/user.js');

module.exports = function(db, passport) {

	passport.use(new passport.Strategy(
		function(username, password, done) {

			var user = User.findUser(username);

			if(!user){
				return done(null, false, { message: 'Incorrect username.' });
			}

			if(!User.validPassword(password, user.passhash)){
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		}
	));

};
