var mongoose = require('mongoose');

var coachSchema = mongoose.Schema({
	id: String,
	firstName : String,
	lastName : String,
	imageUrl : String,
	details : String
}, { collection : 'coaches' });

module.exports = mongoose.model('Coach', coachSchema);