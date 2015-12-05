module.exports = function(app, db) {

	app.route('/api/coaches')
		.get(function(req, res){
			db.collection('coaches').find().toArray(function(err, result){
				if(err){
					throw err;
				} else{
					res.json(result);
				}
			});
		})
		.post(function(req, res){
			var record = req.body;
			res.json(record);
		});

	app.route('/api/mailing-list')
		.post(function(req, res){
			db.collection('emailList').insert({email: req.body['email']}, function(err, result) {
				if(err){
					throw result;
				}
				else{
					res.json(result[0]);
				}
			});
		});
		

	app.route('/api/mailing-list/:emailId')
		.delete(function(req, res){
			db.collection('emailList').remove({'_id': new ObjectID(req.params.emailId)}, function(err, result){
				if(err){
					throw result;
				} else {
					res.json({result: 'success'});
				}
			});
		});
/*
	app.post('/api/login', 
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/coaches',
			failureFlash: false
		})
	);*/

	app.get('*', function(req, res){
		res.sendFile(__dirname + '/bower_components/index.html');
	});

};

