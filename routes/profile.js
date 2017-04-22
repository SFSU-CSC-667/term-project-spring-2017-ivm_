module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var user = require('.././user.js');
  var db = require('.././server/models/db.js');

  router.get('/', user.isLoggedIn, function(req, res, next) {
      // allows all users to be rendered in profile.pug
      var result = db.query('SELECT * FROM Player WHERE username = \'' + req.user.username +'\';', function(err, result){
        if(err) console.log(err);
        res.render('profile', {query_rows: result.rows, userName: req.user.username});
      });
  });
  return router;
}

// this checks if the user is logged in, if not, it redirects to homepage.
// function isLoggedIn(req, res, next) {
//
//     if (req.isAuthenticated()){
//         console.log(req.user.username);
//         return next();
//     }
//
//     res.redirect('/');
// }
