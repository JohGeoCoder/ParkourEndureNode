var User = require('./models/user.js');

module.exports = function(db, passport) {

	passport.use('local-login', new passport.Strategy( 
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done) {
			console.log("LOCAL-LOGIN: " + username + " " + password)
			User.findUser(db, username, function(err, user){
				if(err){
					done(err, null);
				}

				console.log("LOCAL-LOGIN: " + user);

				if(!user){
					done(null, false, { message: 'Incorrect username.' });
				}

				User.validPassword(password, user.passhash, function(err, isValid){
					if(err){
						done(err, null);
					}

					if(isValid){
						done(null, user);
					} else{
						done(null, false, { message: 'Incorrect password.' })
					}
				});
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

						User.generateHash(password, function(err, hash){
							if(err){
								done(err, null);
							}

							var newUser = {
								username: '',
								passhash: ''
							};

							newUser['username'] = username;
							newUser['passhash'] = hash;

							db.collection('users').insert(newUser, function(err, result){
								if(err){
									done(err, null);
								}

								done(null, newUser);
							});

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
		console.log("DESERIALIZE: " + username);
		User.findUser(db, username, function(err, user){
			console.log("DESERIALIZE: " + user);
			if(!user){
				done(err, null);
			} else{
				done(null, user);
			}
		});
	});

};
