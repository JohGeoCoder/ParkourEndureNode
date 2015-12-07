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

    generateHash : function(password){
        var createdHash = "";
        passhash(password).hash(function(error, hash){
            if(error){
                throw new Error('Something went wrong!');
            }

            createdHash = hash;
        });

        return createdHash;
    },
    validPassword : function(password, hash){
        var isVerified = false;
        passhash(password).verifyAgainst(hash, function(error, verified){
            if(error){
                throw new Error('Something went wrong!');
            }

            if(!verified) {
                isVerified = false;
            } else {
                isVerified = true;
            }

        });

        return isVerified;
    }

    

};