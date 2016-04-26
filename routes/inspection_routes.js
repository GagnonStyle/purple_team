var express = require('express');
var model = require('../lib/inspections');
var establishments = require('../lib/food_establishments');
var router = express.Router();

router.get('/', (req,res) => {
	res.render('all_inspections');
});

router.get('/new', (req,res) => {
        var message = req.flash('inspections');
        establishments.all(function(err, establishments){
		if(err){
			req.flash('home', 'Error: ' + err);
			res.redirect('/')
		} else {
			res.render('new_inspection', {food_establishments: establishments, message:message});			
		}
	});
});

router.post('/create', (req,res) => {
    var data = req.body;
    // if any empty inputs, redirect back to signup with message

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

	

});


module.exports = router;
