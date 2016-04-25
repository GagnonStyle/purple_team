var express = require('express');
var model = require('../lib/food_establishments');
var router = express.Router();

router.get('/', (req,res) => {
	var message = req.flash('establishments');
	model.all(function(err, establishments){
	      if(err){
	        	req.flash('home', err);
	        	res.redirect('/');
	      } else {
		        res.render('all_establishments', { food_establishments: establishments, message: message });
	      }
    });
});

router.get('/new', (req,res) => {
	var message = req.flash('establishments');
	res.render('new_establishment', { message: message });
});


router.post('/create', (req,res) => {
    var data = req.body;

    // if any empty inputs, redirect back to signup with message
    if(!(data.name && data.town && data.address && data.person_in_charge && data.description)){
		req.flash('establishments', 'One or more required fields omitted');
		res.redirect('/establishments/new'); 
    } else {
		// all good, add establishment
		model.create(data, function(err, establishment) {
			if(err) {
			  req.flash('establishments', 'Error: ' + err);
			  res.redirect('/establishments/new');
			} else {
			  req.flash('establishments', 'New food establishment created successfully!');
			  res.redirect('/establishments');
			}
		});
    }
});


module.exports = router;