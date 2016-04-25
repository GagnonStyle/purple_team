//Database Connection Stuff
var pg = require('pg');
//configure your own constr in db_config.js
var constr = require('../db_config').constr;

//returns all the entries in the violations table for a given inspection
function all_for_inspection(inspection_id, cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('SELECT * FROM violations WHERE inspection_id = $1', [inspection_id], (err, result) => {
	      	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	      	}

	      	var violations = result.rows;

	      	cb(undefined, violations);
	    });

  	});
}