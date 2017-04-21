/*
  Instruction for running sql files on psql:
  1. Open the database using command:  psql databasename
  2. In psql shell, use the command: \i create.sql , this will make the tables
*/

/*Uncomment if you need these tables dropped before recreating them.*/
DROP TABLE Tank;
DROP TABLE Chat;
DROP TABLE Game;
DROP TABLE Player;



/*
first name, last name, password and email are required fields and cannot be null.
all usernames and emails must be unique, so the same email can't have 2 or more accounts
and the same username can't be used by 2 or more users.
postgres doesn't seem to recognize AUTO_INCREMENT, so player_id is SERIAL instead.
SERIAL data type is an alias for: BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE
source: https://dev.mysql.com/doc/refman/5.7/en/numeric-type-overview.html
*/

CREATE TABLE IF NOT EXISTS Player (
  player_id SERIAL,
  wins INTEGER DEFAULT 0,
  first_name VARCHAR(16) NOT NULL,
  last_name VARCHAR(16) NOT NULL,
  password VARCHAR(24) NOT NULL,
  username VARCHAR(16) UNIQUE NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  PRIMARY KEY (player_id)
);

/*
  the game_id=1 refers to the lobby, and this record will have player_id1=1 and player_id2=1.
*/
CREATE TABLE IF NOT EXISTS Game (
  game_id SERIAL,
  score VARCHAR(16),
  PRIMARY KEY(game_id)
);

CREATE TABLE IF NOT EXISTS Tank (
  tank_id SERIAL,
  shot_id BIGINT,
  coordinate_x REAL,
  coordinate_y REAL,
  PRIMARY KEY(tank_id)
);


CREATE TABLE IF NOT EXISTS Shot (
  tank_id BIGINT,
  angle REAL,
  tank_power REAL,
<<<<<<< HEAD:db/create_db.sql
  PRIMARY KEY(tank_id),
  FOREIGN KEY(tank_id) REFERENCES Game(game_id) ON DELETE CASCADE
=======
  FOREIGN KEY(tank_id) REFERENCES Tank(tank_id) ON DELETE CASCADE
>>>>>>> b3f06e3967cafe8741f47402373b7df23e2bcc49:db/create.sql
);

/*
  when game is deleted, the corresponding row is deleted here.
*/
CREATE TABLE IF NOT EXISTS GameUser (
  gameuser_id SERIAL,
  game_id BIGINT,
  player_id BIGINT,
  tank_id BIGINT,
  PRIMARY KEY(gameuser_id),
  FOREIGN KEY(player_id) REFERENCES Player(player_id),
  FOREIGN KEY(game_id) REFERENCES Game(game_id) ON DELETE CASCADE,
  FOREIGN KEY(tank_id) REFERENCES Tank(tank_id)
);
/*
  game_id refers to which game the chat is referring to, and
  game_id=1 means the message is sent to the lobby chat.
*/
CREATE TABLE IF NOT EXISTS Chat(
  chat_id INTEGER,
  game_id INTEGER,
  player_id INTEGER,
  message VARCHAR(255),
  created_at TIMESTAMP,
  PRIMARY KEY(chat_id),
  FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES Player(player_id)
);