var express = require('express');
var model = require('../lib/users');
var router = express.Router();

router.get('/', (req,res) => {
	var message = req.flash('users');
	model.all(function(err, users){
	      if(err){
	        	req.flash('home', 'Error:' + err);
	        	res.redirect('/');
	      } else {
		        res.render('all_users', { users: users, message: message });
	      }
    });
});

router.get('/new', (req,res) => {
	var message = req.flash('users');
	res.render('new_user', { message: message });
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