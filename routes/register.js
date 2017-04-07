var express = require('express');
var router = express.Router();

var db = require('.././server/models/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', invalid_registration: '' });
});

router.post('/', function(req, res, next) {
    const user = req.body;
    // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.
    if(!user.first_name || !user.last_name || !user.email || !user.password || !user.username) {
      res.render('register', { title: 'Register', invalid_registration: ' All fields required. ' });
    }else if(user.passwordConfirm !== user.password) {
      res.render('register', { title: 'Register', invalid_registration: ' Passwords did not match. ' });
    }else{

      /*let result = db.query('SELECT username FROM Player WHERE username = \'' + user.username + '\'');
      console.log("Query result: " + result);
      //if(!result.rows.length)
        //res.render('register', { title: 'Register', invalid_registration: ' The username is already taken. ' });
      result = db.query('SELECT email FROM Player WHERE email = \''  + user.email + '\'');
      console.log("Query result: " + result);

      //if(!result.rows.length)
        //res.render('register', { title: 'Register', invalid_registration: ' The email is already associated with an account. ' });

      /*result.on('row', function(row) {
        if(row.username === user.username) {
          res.render('register', { title: 'Register', invalid_registration: ' The username is already taken. ' });
        }
      });
      result = db.query('SELECT email FROM Player WHERE email = '  + user.email);
      result.on('row', function(row) {
        if(row.email === user.username) {
          res.render('register', { title: 'Register', invalid_registration: ' The email is already associated with an account. ' });
        }
      });*/

      db.query('INSERT INTO Player (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5);'
                  ,[user.first_name, user.last_name, user.username, user.email, user.password]);
    // the url will have a query string registration=complete
    // in index.js, having this query string will print 'Registration Successful' in the rendered page.
      res.redirect('../?registration=complete');
    }
});

module.exports = router;
