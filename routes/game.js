module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var db = require('.././server/db.js');
  var cb = require('.././model/chat.js');
  var game = require('.././model/game.js')
  var tank = require('.././model/tank.js')
  var user = require('.././user.js');
  var shot = require('.././model/shot.js')
  var gameNumber;
  var chats = [];


  router.get('/:id', user.isLoggedIn, function(req, res, next) {
        game.loadGame(req.params.id, function(gameUsers) {
                console.log("req.params: " + req.params);
                res.render('game', {
                    user: req.user,
                    game: req.params,
                    gameUsers: gameUsers.rows,
                    numberPlayers: gameUsers.rows.length,
                    title: 'Tank City Talks',
                    user: req.user,
                    chats: chats
                });
            });
  });


  router.get('/',  user.isLoggedIn, function(req, res, next) {

      game.getGameAvailable(req.user.player_id, function( gameAvailable){
        if(gameAvailable) {
          tank.newTank(function(tankMade) {
            if(tankMade) {
              shot.newShot(tankMade, function(newShot){
                if(newShot){
                  game.enterGame( req.user.player_id, gameAvailable, tankMade,
                  function(gameEntered){
                    if(gameEntered){
                      gameNumber = gameAvailable;
                      res.redirect('/game/' + gameAvailable);
                    }
                  });
                }
              });
            }else {

            }
          });
        } else {
          tank.newTank(function(tankMade) {
            shot.newShot(tankMade, function(newShot){
              if(newShot){
              game.newGame(req.user.player_id, tankMade, function(gameEntered){
                  if(gameEntered){
                    gameNumber = gameEntered;
                    res.redirect('/game/' + gameEntered);
                  }else{
                    res.redirect('/lobby');
                  }
                });
              } else {
                res.redirect('/lobby');
              }
            });
          });
        }

      });
  });

  return router;
}
