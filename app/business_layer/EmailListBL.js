var Email = require('../models/email');

module.exports = {

	getAll : function(req, res){
		Email.find({}, function(err, emails){
			if(err){
				throw err;
			}

			res.json(emails);
		});
	},
	create : function(req, res){
		var newEmail = new Email({email : req.body['email']});
		newEmail.save(function(err){
			if(err){
				res.json({
					'error' : err.message
				});
			}

			res.json(newEmail);
		});
	},
	update : function(req, res){

	},
	delete : function(req, res){
		Email.remove({ '_id' : req.params._id}, function(err){
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
	}

}