//Database Connection Stuff
var pg = require('pg');
//configure your own constr in db_config.js
var constr = require('../db_config').constr;

function one(id, cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from inspections where id = $1', [id], (err, result) => {
	      	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	      	}
	      	if (result.rows.length == 0) {
		        cb('inspection with id ' + id + ' does not exist');
		        return;
	        }

	      	var inspection = result.rows[0];
	      	
	      	cb(undefined, [inspection]);
	    });

  	});
}

//returns all the entries in the users table
function all(cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from inspections', (err, result) => {
	      	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	      	}

	      	var inspections = result.rows;

	      	cb(undefined, inspections);
	    });

  	});
}
function create(data, cb){

	pg.connect(constr, (err, client, done) => {
		if(err){
			cb('could not connect to the database: ' + err);
			return;
		} else {
			client.query('insert into inspections values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
						 [data.establishment_id, data.user_id, data.date_of_inspection, data.time_in, 
data.time_out, data.permit_number, data.type, data.action_required, data.risk_level, data.embargo, data.date_of_reinspection, data.signed],
                                                (err, result) => {
				done();

				// There was an error, complain about it.
				if (err){
	              cb('could not connect to the database: ' + err);
	              return;
	            }

	            //XXX: DONT RETURN 0
	            cb(undefined, 0);
			});
		}
	});
}
exports.all = all;
exports.one = one;
exports.create = create;
