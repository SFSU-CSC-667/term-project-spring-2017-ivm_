var db = require('.././server/models/db.js');

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


/*exports.getAllPlayer = function(getAll) {
  var result = db.query('SELECT * FROM Player;', function(err, result){
    //res.send(result.rows);

    res.render('profile', {query_rows: result.rows});
  });
}*/
