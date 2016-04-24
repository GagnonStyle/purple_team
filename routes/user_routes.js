var express = require('express');
var model = require('../lib/users');
var router = express.Router();

router.get('/', (req,res) => {
	model.all(function(err, users){
	      if(err){
	        	console.log(err);
	        	res.redirect('/');
	      } else {
		        res.render('all_users', { users: users });
	      }
    });
});

router.get('/new', (req,res) => {
	res.render('new_user');
});


router.post('/create', (req,res) => {
	
});


module.exports = router;