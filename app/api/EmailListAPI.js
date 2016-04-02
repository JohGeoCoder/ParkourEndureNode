var EmailListBL = require('../business_layer/EmailListBL.js');

module.exports = function(app){

	app.post('/api/mailing-list', function(req, res) {
		EmailListBL.create(req, res);
	});

	app.get('/api/admin/mailing-list', function(req, res){
		EmailListBL.getAll(req, res);
	});

	app.delete('/api/admin/mailing-list/:emailId', function(req, res){
		EmailListBL.delete(req, res);
	})
		
	app.delete('/api/mailing-list/:emailId', function(req, res) {
		EmailListBL.delete(req, res);
	});

};