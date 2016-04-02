

module.exports = {

	login : function(req, res, passport, next){
		passport.authenticate('local-login', function(err, user, info){
			if(err){
				res.json({ 'success' : false });
				return next(err);
			}

			if(!user){
				res.json({ 'success' : false });
				return res.redirect('/');
			}

			req.logIn(user, function(err){
				if(err){
					res.json({ 'success' : false });
					return next(err);
				}

				res.json({ 'success' : true })
			})

		})(req, res, next);
	},
	signup : function(passport){
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/coaches',
			failureFlash: true
		})
	},
	logout : function(req, res){
		req.session.destroy(function(err){
			res.redirect('/');
		});
	},
	getLoginStatus : function(req, res){
		res.json({'isLoggedIn' : req.isAuthenticated()});
	}

}