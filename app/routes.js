var Coach = require('./models/coach');
var Email = require('./models/email');

module.exports = function(app, passport, db) {

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

	app.get('/api/admin', isLoggedIn, function(req, res){
		res.redirect('/coaches');
	});

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	console.log("reached isLoggedIn() function");
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
    	console.log("Logged in");
        return next();
    }

    console.log("Not logged in!");

    // if they aren't redirect them to the home page
    res.redirect('/');
}

