var express = require('express');
var router = express.Router();

var player = require('../model/player.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', invalid_registration: '' });
});

router.post('/', function(req, res, next) {
    const user = req.body;
    if(user.passwordConfirm !== user.password) {
      res.render('register', { title: 'Register', invalid_registration: ' Passwords did not match. ' });
    } else {
      player.registerNewPlayer(res, req, function(status){
        if(status){
          res.redirect('../?registration=complete');
        } else {
          // if registration is successful, go back to the homepage, and the url will have a query string registration=complete
          // in index.js, having this query string will print 'Registration Successful' in the rendered page.
          res.render('register', { title: 'Register', invalid_registration: ' Username or email already taken. ' });
        }
      });
    }
    /*const user = reqBody.body;
    // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.
    if(user.passwordConfirm !== user.password) {
      res.render('register', { title: 'Register', invalid_registration: ' Passwords did not match. ' });
    }else{

      db.query('INSERT INTO Player (first_name, last_name, username, email, password) '
              + 'VALUES ( \'' + user.first_name +'\', \'' + user.last_name + '\', \'' + user.username
              + '\', \'' + user.email + '\', \'' + user.password + '\');',
              function(err, result){
                // if insertion fails because it violated constraints (like the constraint that
                // all password and username should be unique), then the error message will be displayed
                if(err){
                  res.render('register', { title: 'Register', invalid_registration: ' Username or email already taken. ' });
                }else {
                  // if registration is successful, go back to the homepage, and the url will have a query string registration=complete
                  // in index.js, having this query string will print 'Registration Successful' in the rendered page.
                  res.redirect('../?registration=complete');
                }
              });
    }*/
});

module.exports = router;
