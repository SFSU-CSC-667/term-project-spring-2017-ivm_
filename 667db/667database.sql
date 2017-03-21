/*
first name, last name, password and email are required fields and cannot be null.
all usernames and emails must be unique, so the same email can't have 2 or more accounts
and the same username can't be used by 2 or more users.
postgres doesn't seem to recognize AUTO_INCREMENT, so player_id is SERIAL instead.
SERIAL data type is an alias for: BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE
source: https://dev.mysql.com/doc/refman/5.7/en/numeric-type-overview.html
*/
CREATE TABLE Player (
  player_id SERIAL,
  wins INTEGER DEFAULT 0,
  first_name VARCHAR(16) NOT NULL,
  last_name VARCHAR(16) NOT NULL,
  password VARCHAR(24) NOT NULL,
  username VARCHAR(16) UNIQUE NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  PRIMARY KEY (player_id)
);

CREATE TABLE Game (
  game_id INTEGER,
  player1_id INTEGER,
  player2_id INTEGER,
  score VARCHAR(16),
  turn INTEGER,
  PRIMARY KEY(game_id),
  FOREIGN KEY (player1_id) REFERENCES Player(player_id),
  FOREIGN KEY (player2_id) REFERENCES Player(player_id)
);

/*
 power column renamed to tank_power b/c power is a key word.
*/
CREATE TABLE Tank (
  tank_id INTEGER,
  game_id INTEGER,
  coordinate_x REAL,
  coordinate_y REAL,
  angle REAL,
  tank_power REAL,
  PRIMARY KEY(tank_id),
  FOREIGN KEY(game_id) REFERENCES Game(game_id)
);

/*
TIMESTAMP might be too much since it has day, month, year, seconds, hour etc...
game_id=0 means the message is sent to the lobby chat..
if we want game_id auto-incremented, set auto-increment of
only 1 player_id here, and it corresponds to message sent from that user to which game.
*/
CREATE TABLE Chat(
  chat_id INTEGER,
  game_id INTEGER,
  player_id INTEGER,
  message VARCHAR(255),
  created_at TIMESTAMP,
  PRIMARY KEY(chat_id),
  FOREIGN KEY (game_id) REFERENCES Game(game_id),
  FOREIGN KEY (player_id) REFERENCES Player(player_id)
);
