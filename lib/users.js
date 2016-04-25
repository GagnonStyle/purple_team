//Database Connection Stuff
var pg = require('pg');
//configure your own constr in db_config.js
var constr = require('../db_config').constr;

function create(data, callback){
	pg.connect(constr, (err, client, done) => {
		if(err){
			cb('could not connect to the database: ' + err);
			return;
		} else {
			client.query('insert into users values (default, $1, $2, $3, $4)',
						 [data.is_admin, data.username, data.password, data.town], (err, result) => {
				done();

				// There was an error, complain about it.
				if (err){
	              cb('could not connect to the database: ' + err);
	              return;
	            }

	            //There was no error, return the username of the added user
	            cb(undefined, data.username);
			});
		}
	});
}

function login(username, password, cb) {
	one(username, function(err, user){
	    if(err) {
	      	cb(err);
	      	return;
	    }
	    if(user && user[0].password != password){
	      	cb('Incorrect Password');
	    } else {
	      	cb(undefined, user[0]);
	    }
	});
}

//returns the user with +username+ if one exists. otherwise error.
function one(username, cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from users where username = $1', [username], (err, result) => {
	     	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	        	return;
	      	}

	      	if (result.rows.length == 0) {
	        	cb('user ' + username + ' does not exist');
	        	return;
	      	}

	      	var u = result.rows[0];

	      	cb(undefined, [u]);
	    });
	});
};

//returns all the entries in the users table
function all(cb) {
  	pg.connect(constr, (err, client, done) => {
    	if (err) {
      		cb('could not connect to the database: ' + err);
      		return;
    	}
	    client.query('select * from users', (err, result) => {
	      	done();

	      	if (err) {
	        	cb('could not connect to the database: ' + err);
	      	}

	      	var users = result.rows;

	      	cb(undefined, users);
	    });

  	});
}

exports.all   = all;
exports.one   = one;
exports.login = login;