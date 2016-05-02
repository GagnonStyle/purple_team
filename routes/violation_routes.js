var express = require('express');
var model = require('../lib/violations');
var router = express.Router();
router.get('/new', function (req, res) {
    var user = req.session.user;
	if(user){
		if (req.query.inspection_id){
		    res.render('violations', {
				current_user: user, inspection_id: req.query.inspection_id
			});
		} else {
			req.flash('home', 'You need an inspection id.');
			res.redirect('/');
		}
	} else {
		req.flash('login', 'You must be logged in to do this');
		res.redirect('/users/login');		
	}
    
});
router.post('/create', function (req, res) {
    var user = req.session.user;  
	
	if(user) {
		var data = req.body;
		
		if(!(data.inspection_id && data.name && data.color && data.description && data.food_code_clause_number)) {
		    req.flash('violations', 'One or more required fields omitted');
			res.redirect('/inspections'); 
		} else {
			model.create(data, function(err, user) {			
					if(err) {
					  req.flash('violations', 'Error: ' + err);
					  res.redirect('/violations/new');
					} else {
					  req.flash('violations', 'Violation created successfully!');
					  res.redirect('/inspections');
					}
					
			});
		}
	}
	else {
		req.flash('login', 'You must be logged in to do this');
		res.redirect('/users/login');		
	
	}
});
module.exports = router;