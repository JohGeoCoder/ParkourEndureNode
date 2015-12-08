var passhash = require('password-hash-and-salt');

module.exports = {

    findUser : function(db, username, callback){
        db.collection('users').find({'username' : username}).toArray(function(err, result){
            if(err){
                callback(err, null);
            }

            var user = {};

            if(result.length > 0){
                user = result[0];
            } else{
                user = null;
            }

            
            callback(null, user);
        });
    },

    generateHash : function(password, callback){
        passhash(password).hash(function(error, hash){
            if(error){
                callback(error, null);
            }

            callback(null, hash);
        });
    },
    validPassword : function(password, hash, callback){
        passhash(password).verifyAgainst(hash, function(error, verified){
            if(error){
                callback(error, null);
            }

            if(!verified) {
                callback(null, true);
            } else {
                callback(null, false);
            }

        });
    }

    

};