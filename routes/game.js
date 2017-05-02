module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var user = require('.././user.js');
  var db = require('.././server/db.js');
  var cb = require('.././model/chat.js');

  router.get('/:id', /*user.isLoggedIn,*/ function(req, res, next) {
      // allows all users to be rendered in profile.pug
      // var result = db.query('SELECT * FROM Player;', function(err, result){
      //   if(err) console.log(err);
      //   res.render('profile', {query_rows: result.rows, userName: req.user.username});
      // });
      cb.getLobbyChats(function(error, result) {
          if (error) {
              console.log("Error loading game chat: " + error.statusCode)
          }
          res.render('game', { title: 'Tank City Talks', user: req.user, chats: result.rows.reverse() });
      })
  });

  router.get('/', /*user.isLoggedIn,*/ function(req, res, next) {

      // allows all users to be rendered in profile.pug
      // var result = db.query('SELECT * FROM Player;', function(err, result){
      //   if(err) console.log(err);
      //   res.render('profile', {query_rows: result.rows, userName: req.user.username});
      // });
      res.redirect('/game/2');
  });

  router.post('/', user.isLoggedIn, function(req, res){

  })

  router.post('/', function(req, res, next) {
     cb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result) {
        if (error) {
          console.log("Error inserting message for game chat: " + error.statusCode)
        }
          console.log("game chat logged")
     })
  });


  return router;
}
