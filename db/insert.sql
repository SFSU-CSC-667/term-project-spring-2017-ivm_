/*
inserting without specifying wins and id should make wins=0 and id auto-incremented.
*/

INSERT INTO Game VALUES (0);

INSERT INTO Player (first_name, last_name, password, username, email)
VALUES ('Jon', 'Ben', 'password1', 'jonben1', 'test1@mail.com');

INSERT INTO Player (first_name, last_name, password, username, email)
VALUES ('Rob', 'Bob', '1234567', 'rb89', 'test2@mail.com');

INSERT INTO Player (first_name, last_name, password, username, email)
VALUES ('Rob2', 'Bob2', '12345267', 'rb289', 'test22@mail.com');


