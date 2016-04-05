module.exports = function(app, passport, db) {

	require('./api/AdminAPI.js');

	require('./api/CoachesAPI.js')(app);

	require('./api/EmailListAPI.js')(app);

	require('./api/LoginAPI.js')(app, passport);
	
}


