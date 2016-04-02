var LoginBL = require('../business_layer/LoginBL.js');

module.exports = function(app, passport){

	app.post('/api/login', function(req, res, next){
		LoginBL.login(req, res, passport, next);
	});

	app.post('/api/signup', function(req, res){
		LoginBL.signup(passport);
	});

	app.get('/api/logout', function(req, res){
		LoginBL.logout(req, res);
	});

	app.get('/api/loginstatus', function(req, res){
		LoginBL.getLoginStatus(req, res);
	});

};