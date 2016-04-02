var CoachesBL = require('../business_layer/CoachesBL.js');

module.exports = function(app){

	app.get('/api/coaches', function(req, res){
		CoachesBL.getAll(req, res);
	});

	app.put('/api/coaches', function(req, res){
		CoachesBL.create(req, res);
	});

	app.post('/api/coaches', function(req, res){
		CoachesBL.update(req, res);
	});

}