module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var user = require('.././user.js');
  var db = require('.././server/db.js');

  router.get('/:id', user.isLoggedIn, function(req, res, next) {
      // allows all users to be rendered in profile.pug
      // var result = db.query('SELECT * FROM Player;', function(err, result){
      //   if(err) console.log(err);
      //   res.render('profile', {query_rows: result.rows, userName: req.user.username});
      // });
      res.render('game');
  });
  return router;
}
