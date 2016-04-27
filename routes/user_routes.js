var express = require('express');
var model = require('../lib/users');
var router = express.Router();

router.get('/', (req,res) => {
	var user = req.session.user;
	var message = req.flash('users');
	model.all(function(err, users){
	      if(err){
	        	req.flash('home', 'Error:' + err);
	        	res.redirect('/');
	      } else {
		        res.render('all_users', { 
		        	current_user: user,
		        	users: users, 
		        	message: message 
		        });
	      }
    });
});

router.get('/new', (req,res) => {
    	var user = req.session.user;
	var message = req.flash('users');
	res.render('new_user', { 
		current_user: user,
		message: message 
	});
});

router.get('/login', (req,res) => {
	var user = req.session.user;

	if(user){
		req.flash('home', 'Already logged in as ' + user.username);
		res.redirect('/');
	} else {
		var message = req.flash('login');
		res.render('login', {
			current_user: user,
			message: message
		});
	}
});

router.get('/logout', (req,res) => {
	var user = req.session.user;
	if(user){
		delete req.session.user;

		req.flash('home', 'Successfully logged out');
		res.redirect('/');
	} else {
		req.flash('home', 'You\'re already logged out!');
		res.redirect('/');
	}
});

router.post('/auth', (req, res) => {
	var user = req.session.user;

	if(user){
		req.flash('home', 'Already logged in as ' + user.username);
		res.redirect('/');
	} else {
		var username = req.body.username;
		var password = req.body.password;

		if(!(username && password)){
			req.flash('login', 'One or more fields empty');
			res.redirect('/users/login');
		} else {
			model.login(username, password, function(error, user){
				if(error){
					req.flash('login', error);
					res.redirect('/users/login');
				} else {
					//Set the session user
					req.session.user = user;

					req.flash('home', 'Logged in successfully as '+ user.username);
					res.redirect('/');
				}
			});
		}
	}
});


router.post('/create', (req,res) => {
    var data = req.body;

    (!data.is_admin) && (data.is_admin = false);
    // if any empty inputs, redirect back to signup with message
    if(!(data.username && data.town && data.password && data.confirm_password)){
		req.flash('users', 'One or more required fields omitted');
		res.redirect('/users/new'); 
    } else if(data.password !== data.confirm_password) {
		// check if passwords match
		req.flash('users', 'Passwords must match');
		res.redirect('/users/new');
    } else {
		// all good, add user
		model.create(data, function(err, user) {
			if(err) {
			  req.flash('users', 'Error: ' + err);
			  res.redirect('/users/new');
			} else {
			  req.flash('users', 'User created successfully!');
			  res.redirect('/users');
			}
		});
    }
});


module.exports = router;
