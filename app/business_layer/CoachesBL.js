var Coach = require('../models/coach');

module.exports = {
	
	getAll : function(req, res){
		Coach.find({}, function(err, coaches){
			res.json(coaches);
		});
	},
	create : function(req, res){
		var newCoach = new Coach({
			firstName : "First",
			lastName : "Last",
			imageUrl : "img/pkCoachJohn.png",
			details : "details"
		});
		newCoach.save(function(err){
			if(err){
				res.json({
					'error' : err.message
				});
			}

			res.json(newCoach);
		});
	},
	update : function(req, res){
		Coach.find({'_id' : req.body['objectId']}, function(err, coaches){
			if(err){
				res.json({
					'error' : err.message
				});
				return;
			}

			var coachToUpdate = coaches[0];

			if(coachToUpdate){
				coachToUpdate.firstName = req.body['firstName'];
				coachToUpdate.lastName = req.body['lastName'];
				coachToUpdate.imageUrl = req.body['imageUrl'];
				coachToUpdate.details = req.body['details'];

				coachToUpdate.save(function(err){
					if(err){
						res.json({
							'error' : err.message
						});
						return;
					}

					res.json({
						'success' : true
					});
				});
			}
		});
	}

};