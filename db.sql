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
	time_hout timestamp,
	permit_number integer,
	type varchar(255),
	action_required boolean,
	risk_level integer,
	embargo boolean,
	date_of_resinspection date,
	signed varchar(255),
	primary key (id)
);

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


-- create table foodcodeclause (
-- 	#This might not end up existing
-- )
