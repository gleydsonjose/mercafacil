CREATE TABLE contacts (
	id SERIAL PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	cellphone VARCHAR ( 13 ) NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	login VARCHAR ( 50 ) NOT NULL,
	password VARCHAR ( 40 ) NOT NULL,
	id_client INT NOT NULL
);
