/*
inserting without specifying wins and id should make wins=0 and id auto-incremented.
*/
INSERT INTO Player (first_name, last_name, password, username, email)
VALUES ('Jon', 'Ben', 'password1', 'jonben1', 'test1@mail.com');

INSERT INTO Player (first_name, last_name, password, username, email)
VALUES ('Rob', 'Bob', '1234567', 'rb89', 'test2@mail.com');

INSERT INTO Game (game_id, player1_id, player2_id, score, turn)
VALUES (1, 1, 2, '10:10', 1);
