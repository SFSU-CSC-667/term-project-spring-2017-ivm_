var db = require('../server/db.js');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

exports.registerNewPlayer = function(res, reqBody, callBack) {
  const user = reqBody.body;

  db.query('INSERT INTO Player (first_name, last_name, username, email, password) '
          + 'VALUES ( \'' + user.first_name +'\', \'' + user.last_name + '\', \'' + user.username
            + '\', \'' + user.email + '\', \'' + user.password + '\');',
            function(err, result){
              if(err){
                callBack(0);
              }else {
                callBack(1);
              }
            });
  }


exports.loginPlayer = function(reqBody, callBack) {
  const user = reqBody.body;

  console.log("here");
  db.query('SELECT * FROM Player WHERE email = \'' + user.email + '\' AND password = \'' + user.password + '\';',
            function(err, result){

              if(err || result.rows.length !==1){
                console.log(result.rows);
                err = err || 1;
                callBack(err, null);
              }else {
                console.log(result.rows);
                callBack(0, result.rows[0]);
              }
            });
  }

exports.findByUsername = function(username, callBack){
    db.query('SELECT * FROM Player WHERE username = \'' + username + '\';',
            function(err, result){

              if(err){
                  console.log("player.js error");
                  return callBack(err);
              }

              else if(result.rows.length!== 1){
                  return callBack(0, null);
              }

              else{
                  console.log("findname here");
                  return callBack(0, result.rows[0]);
              }
            });
}

exports.findByEmail = function(username, callBack){
    db.query('SELECT * FROM Player WHERE email = \'' + email + '\';',
            function(err, result){
              if(err)
                  return callBack(err);
              else if(result.rows.length!== 1)
                  return callBack(0, null);
              else
                  return callBack(0, result.rows[0]);
            });
}

exports.getAll = function(callBack){
    db.query('SELECT * FROM Player;',
            function(err, result){
              if(err)
                  return callBack(err);
              else
                  return callBack(result.rows); 
            });
}

exports.updateUserProfile = function(user, updateComplete) {
    db.query('UPDATE Player ' +
             'SET first_name=\'' + user.firstName + '\''
            + ' last_name=\'' + user.lastName + '\''
            + ' username=\'' + user.username + '\''
            + ' email=\'' + user.email + + '\''
            + ' password=\'' + user.password + '\''
            + ' WHERE player_id=' + user.id, function (error, result) {

        if (error){
            console.log("Error update user profile: " + error);
        }

        updateComplete(error, result);
    })
}