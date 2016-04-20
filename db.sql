# this is SQL or some s**t, we should use it to make the database

create table user (
	#user fields
)

create table inspectionform (
	#inspectionform fields
)

create table violation (
	id Int,
	name varchar(60),
	color varchar(30),
	description text,
	imagePath varchar(255),
	form_ID Int,
	food_code_clause_ID Int
)

create table foodestablishment (
	id Int,
	name varchar(30),
	town varchar(30),
	address text,
	person_in_charge varchar(60),
	description text
)


create table foodcodeclause (
	#This might not end up existing
)
