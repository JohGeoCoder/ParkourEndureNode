module.exports = function(app, passport, db) {

	app.all('/admin/*', authenticateAdminRoute, function(req, res, next){
		next();
	});

	app.all('/api/admin/*', authenticateAdminApi, function(req, res, next){
		next();
	});

	require('./api/CoachesAPI.js')(app);

	require('./api/EmailListAPI.js')(app);

	require('./api/LoginAPI.js')(app, passport);
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

