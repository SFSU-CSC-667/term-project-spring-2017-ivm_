


module.exports = function(app, router){

  var express = require('express');
  var router = express.Router();
  var db = require('.././server/models/db.js');
  /* GET home page. */
  router.get('/', isLoggedIn, function(req, res, next) {
      // allows all users to be rendered in profile.pug
      var result = db.query('SELECT * FROM Player;', function(err, result){
        //res.send(result.rows);
        res.render('profile', {query_rows: result.rows, userName: req.user.username});
      });
  });
  return router;
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log(req.user.username);
        return next();
    }
    //console.log(req.user.username);
    // if they aren't redirect them to the home page
    res.redirect('/');
}
//module.exports = router;
