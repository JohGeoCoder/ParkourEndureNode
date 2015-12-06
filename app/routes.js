module.exports = function(app, db, passport, mongo) {

	ObjectID = mongo.ObjectID;

	app.get('/api/coaches', function(req, res){
		db.collection('coaches').find().toArray(function(err, result){
			if(err){
				throw err;
			} else{
				res.json(result);
			}
		});
	});

	app.post('/api/mailing-list', function(req, res) {
		db.collection('emailList').insert({email: req.body['email']}, function(err, result) {
			if(err){
				throw result;
			}
			else{
				res.json(result[0]);
			}
		});
	});
		
	app.delete('/api/mailing-list/:emailId', function(req, res) {
		db.collection('emailList').remove({'_id': new ObjectID(req.params.emailId)}, function(err, result){
			if(err){
				throw result;
			} else {
				res.json({result: 'success'});
			}
		});
	});


	app.post('/api/login', 
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/coaches',
			failureFlash: false
		})
	);

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

