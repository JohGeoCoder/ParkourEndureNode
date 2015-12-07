var User = require('./models/user.js');

module.exports = function(db, passport) {

	passport.use('local-login', new passport.Strategy( 
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done) {

			var user = User.findUser(db, username, function(err, user){
				if(err){
					done(err, null);
				}

				console.log(user);

				if(!user){
					done(null, false, { message: 'Incorrect username.' });
				}

				if(!User.validPassword(password, user.passhash)){
					done(null, false, { message: 'Incorrect password.' });
				}

				done(null, user);
			});
		}
	));

	passport.use('local-signup', new passport.Strategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){

			//Asynchronous
			//User.findUser won't fire unless data is sent back
			process.nextTick(function() {

				//Search for an existing user with the desired username.
				var user = User.findUser(db, username, function(err, user){
					if(err){
						done(err, null);
					}

					if(user){
						done(null, false);
					} else {
						var newUser = {
							username: '',
							passhash: ''
						};

						newUser['username'] = username;
						newUser['passhash'] = User.generateHash(password);

						db.collection('users').insert({user: newUser}, function(err, result){
							if(err){
								throw err;
							}

							done(null, newUser);
						});
					}
				});

			});
		}

	));

	passport.serializeUser(function(user, done) {
		console.log(user);
		done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {
		console.log(username);
		var user = User.findUser(db, username, function(err, user){
			if(!user){
				done(new Error('Could not deserialize user.'), null);
			} else{
				done(null, user);
			}
		});
	});

};
