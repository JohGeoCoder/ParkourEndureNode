var Coach = require('./models/coach');
var Email = require('./models/email');

module.exports = function(app, passport, db) {

	app.all('/admin/*', authenticateAdminRoute, function(req, res, next){
		next();
	});

	app.all('/api/admin/*', authenticateAdminApi, function(req, res, next){
		next();
	});

	app.get('/api/coaches', function(req, res){
		Coach.find({}, function(err, coaches){
			res.json(coaches);
		});
	});

	app.post('/api/mailing-list', function(req, res) {
		var newEmail = new Email({email : req.body['email']});
		newEmail.save(function(err){
			if(err){
				res.json({
					'error' : err.message
				});
			}

			res.json(newEmail);
		});
	});

	app.get('/api/admin/mailing-list', function(req, res){
		Email.find({}, function(err, emails){
			if(err){
				throw err;
			}

			res.json(emails);
		});
	});

	app.delete('/api/admin/mailing-list/:emailId', function(req, res){
		Email.remove({ '_id' : req.params.emailId}, function(err){
			if(err){
				res.json({
					'errorMessage' : err.message,
					'success' : false
				})
			} else{
				res.json({
					'success' : true
				})
			}
		});
	})
		
	app.delete('/api/mailing-list/:emailId', function(req, res) {
		Email.remove({ '_id' : req.params.emailId}, function(err) {
			if(err){
				res.json({
					'errorMessage' : err.message,
					'result' : false
				});
			} else{
				res.json({ 'result' : true })
			}
		});
	});

	app.post('/api/login', function(req, res, next){

		passport.authenticate('local-login', function(err, user, info){
			if(err){
				res.json({ 'success' : false });
				return next(err);
			}

			if(!user){
				res.json({ 'success' : false });
				return res.redirect('/');
			}

			req.logIn(user, function(err){
				if(err){
					res.json({ 'success' : false });
					return next(err);
				}

				res.json({ 'success' : true })
			})

		})(req, res, next);
	})

/*	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/coaches',
		failureFlash: true
	}));*/

	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/coaches',
		failureFlash: true
	}));

	app.get('/api/logout', function(req, res){
		req.session.destroy(function(err){
			res.redirect('/');
		});
	});

	app.get('/api/loginstatus', function(req, res){
		res.json({'isLoggedIn' : req.isAuthenticated()});
	});
}

// route middleware to make sure a user is logged in
function authenticateAdminRoute(req, res, next) {
    // if user is authenticated in the session, carry on.
    if (req.isAuthenticated()){
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function authenticateAdminApi(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.json(['Access Denied']);
}

