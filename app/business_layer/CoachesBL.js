var Coach = require('../models/coach');

module.exports = {
	
	'getAllCoaches' : function(req, res){
		Coach.find({}, function(err, coaches){
			res.json(coaches);
		});
	}
	
};