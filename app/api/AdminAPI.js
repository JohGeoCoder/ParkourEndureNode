

module.exports = function(app){

	app.all('/admin/*', authenticateAdminRoute, function(req, res, next){
		next();
	});

	app.all('/api/admin/*', authenticateAdminApi, function(req, res, next){
		next();
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
