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
				console.log(emails);
			});
	});


		
	app.delete('/api/mailing-list/:emailId', function(req, res) {
		Email.remove({ '_id' : req.params.emailId}, function(err) {
			if(err){
				res.json({
					'errorMessage' : err.message,
					'result' : false
				});
			}

			res.json({ 'result' : true })
		});
	});


	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/coaches',
		failureFlash: true
	}));

	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/coaches',
		failureFlash: true
	}));

	app.get('/api/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

/*	app.get('/api/admin/*', authenticateRoute, function(req, res){});*/



}

// route middleware to make sure a user is logged in
function authenticateAdminRoute(req, res, next) {
    // if user is authenticated in the session, carry on 
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

