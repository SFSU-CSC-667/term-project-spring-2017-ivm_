var db = require('.././server/models/db.js');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;



exports.registerNewPlayer = function(res, reqBody, callBack) {
  const user = reqBody.body;
  // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.

  db.query('INSERT INTO Player (first_name, last_name, username, email, password) '
          + 'VALUES ( \'' + user.first_name +'\', \'' + user.last_name + '\', \'' + user.username
            + '\', \'' + user.email + '\', \'' + user.password + '\');',
            function(err, result){
              // if insertion fails because it violated constraints (like the constraint that
              // all password and username should be unique), then the error message will be displayed
              if(err){
                callBack(0);
              }else {
                // if registration is successful, go back to the homepage, and the url will have a query string registration=complete
                // in index.js, having this query string will print 'Registration Successful' in the rendered page.
                callBack(1);
              }
            });
  }


exports.loginPlayer = function(reqBody, callBack) {
  const user = reqBody.body;
  // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.
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
              // if(result.rows.length!== 1 || err) return callBack(null);
              // else return callBack(result.rows[0]); // else return the 1 and only row
              if(err){ console.log("player.js error");return callBack(err);}
              // callBack(0,..) means that no error occurred.
              else if(result.rows.length!== 1){ return callBack(0, null);}
              // 0 as first argument to callback means no error occurred.
              else{ console.log("findname here"); return callBack(0, result.rows[0]);}
            });
}

exports.findByEmail = function(username, callBack){
    db.query('SELECT * FROM Player WHERE email = \'' + email + '\';',
            function(err, result){
              if(err) return callBack(err);
              // first argument as 0 means no error
              else if(result.rows.length!== 1) return callBack(0, null);
              else return callBack(0, result.rows[0]); // else return the 1 and only row
            });
}

exports.getAll = function(callBack){
    db.query('SELECT * FROM Player;',
            function(err, result){
              if(err) return callBack(err);
              else return callBack(result.rows); // else return the 1 and only row
            });
}

/*exports.getAllPlayer = function(getAll) {
  var result = db.query('SELECT * FROM Player;', function(err, result){
    //res.send(result.rows);

    res.render('profile', {query_rows: result.rows});
  });
}*/
