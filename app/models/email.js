var mongoose = require('mongoose');

var emailSchema = mongoose.Schema({
	email : String
}, { collection : 'emailList' });

module.exports = mongoose.model('Email', emailSchema);