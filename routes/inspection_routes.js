var express = require('express');
var model = require('../lib/inspections');
var establishments = require('../lib/food_establishments');

var router = express.Router();

router.get('/', (req,res) => {
	res.render('all_inspections');
});

router.get('/new', (req,res) => {
	establishments.all(function(err, establishments){
		if(err){
			req.flash('home', 'Error: ' + err);
			res.redirect('/')
		} else {
			res.render('new_inspection', {food_establishments: establishments});			
		}
	});
});


module.exports = router;
