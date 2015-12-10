var Coach = require('./models/coach');
var Email = require('./models/email');

module.exports = function(app, passport, db) {

	app.get('/api/coaches', function(req, res){

		Coach.find({}, function(err, coaches){
			res.json(coaches);
			console.log(coaches);
		});

		/*Coach.findOne({}, function(err, coaches){
			console.log(coaches);
		});*/

		/*db.collection('coaches').find().toArray(function(err, result){
			if(err){
				throw err;
			} else{
				res.json(result);
			}
		});*/
	});

	app.post('/api/mailing-list', function(req, res) {

		var newEmail = new Email({email : req.body['email']});
		newEmail.save(function(err){
			Email.find({ '_id' : newEmail._id }, function(err, insertedEmail){
				console.log(insertedEmail);
			});
		});
		/*db.collection('emailList').insert({email: req.body['email']}, function(err, result) {
			if(err){
				throw err;
			}
			else{
				res.json(result[0]);
			}
		});*/
	});
		
	app.delete('/api/mailing-list/:emailId', function(req, res) {
		/*db.collection('emailList').remove({'_id': new ObjectID(req.params.emailId)}, function(err, result){
			if(err){
				throw err;
			} else {
				res.json({result: 'success'});
			}
		});*/
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
	})

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

