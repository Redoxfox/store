# Hola
## My name is carlos 

This my primer post lo mejor de escribir mis primeros post

[my site](https://www.faztweb.com)


create table blg_category(
	id int not null auto_increment primary key,
	name varchar(255)
);

create table blg_user(
	id int not null auto_increment primary key,
	name varchar(50),
	lastname varchar(50),
	username varchar(50),
	email varchar(255),
	password varchar(60),
	image varchar(255),
	status int default 1,
	kind int default 1, 
	created_at datetime
);

create table post(
	id int not null auto_increment primary key,
	title varchar(255),
	brief varchar(511),
	content text,
	image varchar(255),
	created_at datetime,
	status int default 1,
	user_id int not null,
	category_id int not null
);