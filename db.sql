drop table if exists users;
drop table if exists inspections;
drop table if exists violations;
drop table if exists food_establishments;

create table users (
	id serial,
	is_admin boolean,
	username varchar(255),
	password varchar(255),
	town varchar(255),
	primary key (id)
);
insert into users values (default, TRUE, 'pparker', 'spiderman', 'Midtown');
insert into users values (default, FALSE, 'jjjameson', 'dailybugle', 'Midtown');

create table inspections (
	id serial,
	establishment_id integer,
	user_id integer,
	date_of_inspection date,
	time_in timestamp,
	time_out timestamp,
	permit_number integer,
	type varchar(255),
	action_required boolean,
	risk_level integer,
	embargo boolean,
	date_of_resinspection date,
	signed varchar(255),
	primary key (id)
);
-- insert into food_establishments values (default, 1, 1, '2015-12-12', '4321432', '4321433', 1, 'no clue', FALSE, 3, FALSE, '2016-11-11', 1);

create table violations (
	id serial,
	inspection_id integer,
	name varchar(255),
	color varchar(255),
	description text,
	image_path varchar(255),
	food_code_clause_number integer,
	primary key (id)
);

create table food_establishments (
	id serial,
	name varchar(255),
	town varchar(255),
	address text,
	person_in_charge varchar(255),
	description text,
	primary key (id)
);
insert into food_establishments values (default, 'White Castle', 'Jersey City', '40 Newport Pkwy', 'John Hammington', 'Burgers and Fries');


-- create table foodcodeclause (
-- 	#This might not end up existing
-- )
