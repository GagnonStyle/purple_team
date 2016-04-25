//Database Connection Stuff
var pg = require('pg');
//configure your own constr in db_config.js
var constr = require('../db_config').constr;


//returns all the entries in the food_establishment table
function all(cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from food_establishments', (err, result) => {
	      	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	      	}

	      	var food_establishments = result.rows;

	      	cb(undefined, food_establishments);
	    });

  	});
}

function create(data, cb){
	pg.connect(constr, (err, client, done) => {
		if(err){
			cb('could not connect to the database: ' + err);
			return;
		} else {
			client.query('insert into food_establishments values (default, $1, $2, $3, $4, $5)',
						 [data.name, data.town, data.address, data.person_in_charge, data.description], (err, result) => {
				done();

				// There was an error, complain about it.
				if (err){
	              cb('could not connect to the database: ' + err);
	              return;
	            }

	            //There was no error, return the name of the added establishment
	            cb(undefined, data.name);
			});
		}
	});
}

//returns the food_establishment with +name+ if one exists. otherwise error.
function one(name, cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from food_establishments where name = $1', [name], (err, result) => {
	     	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	        	return;
	      	}

	      	if (result.rows.length == 0) {
	        	cb('food establishment ' + name + ' does not exist');
	        	return;
	      	}

	      	var u = result.rows[0];

	      	cb(undefined, [u]);
	    });
	});
};

exports.all   = all;
exports.one   = one;
exports.create = create;
