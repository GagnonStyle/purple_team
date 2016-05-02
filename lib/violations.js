//jshint esnext: true
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

function create(data, cb){
	pg.connect(constr, (err, client, done) => {
		if(err){
			cb('could not connect to the database: ' + err);
			return;
		} else {
			client.query('insert into violations values (default, $1, $2, $3, $4, $5, $6)',
						 [data.inspection_id,data.name,data.color,data.description,data.image_path,data.food_code_clause_number],
      			(err, result) => {
				done();

				if (err){
	              cb('could not connect to the database: ' + err);
	              return;
	            }

	            // return true to indicate success
	            cb(undefined, true);
			});
		}
	});
}

function one(name, cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from violations where name = $1', [name], (err, result) => {
	     	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	        	return;
	      	}

	      	if (result.rows.length === 0) {
	        	cb('violation ' + name + ' does not exist');
	        	return;
	      	}

	      	cb(undefined, [result.rows[0]]);
	    });
	});
}

exports.all_for_inspection  = all_for_inspection;
exports.create = create;
exports.one = one;
