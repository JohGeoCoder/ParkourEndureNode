module.exports = function(app, passport) {

	require('./api/AdminAPI.js');

	require('./api/CoachesAPI.js')(app);

	require('./api/EmailListAPI.js')(app);

	require('./api/LoginAPI.js')(app, passport);

	app.get('*', function(req, res){
		res.sendFile(__dirname + '../static/index.html');
	});
	
}


