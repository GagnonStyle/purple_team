var express = require('express');
var model = require('../lib/inspections');
var establishments = require('../lib/food_establishments');
var router = express.Router();

router.get('/', (req,res) => {
	var user = req.session.user;
	if(user){
		model.all(function(err, inspections){
			if(err){
				req.flash('home', 'Error: ' + err);
				res.redirect('/');
			} else {
				res.render('all_inspections', { 
					current_user: user,
					inspections: inspections 
				});
			}
		});
	} else {
		req.flash('login', 'You must be logged in to do this');
		res.redirect('/users/login');		
	}
});

router.get('/new', (req,res) => {
	var user = req.session.user;
	if(user){
		var message = req.flash('inspections');
	    establishments.all(function(err, establishments){
			if(err){
				req.flash('home', 'Error: ' + err);
				res.redirect('/');
			} else {
				res.render('new_inspection', {
					current_user: user, 
					food_establishments: establishments, 
					message: message
				});			
			}
		});
	} else {
		req.flash('login', 'You must be logged in to do this');
		res.redirect('/users/login');
	}
});

router.post('/create', (req,res) => {
	var user = req.session.user;
    
    if(user){
	    var data = req.body;
	    // if any empty inputs, redirect back to signup with message
	    data.user_id = user.id;
	    //XXX: Let user input date
	    data.time_in = new Date();
	    data.time_out = new Date();

	    (!data.action_required) && (data.action_required = false);
	    (!data.embargo) && (data.embargo = false);

	    if(!(data.establishment_id && data.user_id && data.date_of_inspection && data.time_in && data.time_out && data.permit_number && data.type &&  data.risk_level &&  data.date_of_reinspection && data.signed)){
			req.flash('inspections', 'One or more required fields omitted');
			res.redirect('/inspections/new'); 
	    } else {
			// all good, add user
			model.create(data, function(err, user) {
				if(err) {
				  req.flash('inspections', 'Error: ' + err);
				  res.redirect('/inspections/new');
				} else {
				  req.flash('inspections', 'Inspection created successfully!');
				  res.redirect('/inspections');
				}
			});
	    }
	} else {
		req.flash('login', 'You must be logged in to do this');
		res.redirect('/users/login');
	}

});


module.exports = router;
