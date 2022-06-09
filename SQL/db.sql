DROP TABLE IF EXISTS meanings;
DROP TABLE IF EXISTS synonyms;
DROP TABLE IF EXISTS words;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50) NOT NULL
);

ALTER SEQUENCE users_id_seq RESTART WITH 55555;

CREATE TABLE words(
	id SERIAL PRIMARY KEY NOT NULL,
  	user_id INTEGER NOT NULL,
  	date_added TIMESTAMP DEFAULT current_timestamp,
  	word VARCHAR(50) NOT NULL,
  	phonetics VARCHAR(50),
  	freq FLOAT,
  	syllables INTEGER,
  	audio VARCHAR(250),
  	url VARCHAR(250),
  	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE meanings(
	id SERIAL PRIMARY KEY NOT NULL,
  	word_id INTEGER NOT NULL,
  	meaning VARCHAR(250) NOT NULL,
  	pos VARCHAR(50),
  FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE synonyms(
	id SERIAL PRIMARY KEY NOT NULL,
  	word_id INTEGER NOT NULL,
  	word VARCHAR(50) NOT NULL,
  FOREIGN KEY (word_id) REFERENCES words(id)
)








