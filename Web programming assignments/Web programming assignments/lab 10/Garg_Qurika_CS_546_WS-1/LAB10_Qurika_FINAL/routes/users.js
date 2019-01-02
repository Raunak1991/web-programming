var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const uuid = require("node-uuid");
var bcrypt = require("bcryptjs");
var UserModel = require('../models/user');
const xss = require('xss');

router.get('/', ensureAuthenticated,function(req, res){
	//console.log("/ page")
	res.redirect('/private');
	//console.log(User.User[0])
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		   req.flash('error_msg','You are not authenticated or logged-in');
		   res.render('login');

	}
}


function ensureAuthenticatedPrivate(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.session.destroy();
		res.redirect('/');

	}
}
router.get('/login', function(req, res){
	req.logOut();
	req.flash('success_msg', 'You are logged-out');
	req.session.destroy();
  res.redirect('/');
});

router.get('/private',ensureAuthenticatedPrivate, function (req, res) {

	res.render('profile',{username:xss(req.user.username),firstName:xss(req.user.firstName), lastname:xss(req.user.lastname),profession:xss(req.user.profession),bio:xss(req.user.bio)})
	
	
});




passport.serializeUser(function (user, done) {
//	console.log("SERIALOZE USER");
  done(null, user.id);
});


passport.use(new LocalStrategy(
  function (username, password, done) {
				UserModel.getUserByUsername(username).then((user) => {
		//	console.log("I am checking username" + username);
			UserModel.comparePassword(password, user.password, function (err, isMatch) {
				if (err) {
				//	console.log(err);

					throw err;
				}

				if (isMatch) {
			//		console.log("pass matched" + isMatch)
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			})
   	}).catch(function(error){
			 return done(null, false, { message: 'Invalid credentials' });
		 });

  }));


passport.deserializeUser(function (id, done) {
	//console.log("SERIALOZE USER" + id);
  UserModel.getUserById(id).then((user) => {
    done(null, user);
  });
});


router.post('/login',
  passport.authenticate('local', { successRedirect: '/private', failureRedirect: '/', failureFlash: true }),
  function (req, res) {
		
	//	console.log("Passowrd authenticate post page")
    res.redirect('/private');
  });

// router.get('/logout', function (req, res) {
// 	req.logOut();
// 	req.session.destroy();
// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/');
// });

//  router.get('/logout', function (req, res, next) {
//   // Get rid of the session token. Then call `logout`; it does no harm.
//  req.logout();

// 	req.flash('success_msg', 'You are logged out');

// 	res.redirect('/login');
// });

module.exports = router;