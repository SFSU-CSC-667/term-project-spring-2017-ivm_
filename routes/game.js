module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var db = require('.././server/db.js');
  var cb = require('.././model/chat.js');
  var game = require('.././model/game.js')
  var tank = require('.././model/tank.js')
  var user = require('.././user.js');
  var shot = require('.././model/shot.js')
  // used to pass game id in /game/:id
  var gameNumber;
  var chats = [];


  router.get('/:id', user.isLoggedIn, function(req, res, next) {
        game.loadGame(req.params.id, function(gameUsers) {
                console.log("req.params: " + req.params);
                // game.id in game.pug will get the id of the game, through req.params.
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
          // if a row exists in GameUser table that has a unique game_id than all other row, this if-block executes.
          // tank is created, tankMade is simply just the tank_id (might need to rename argument later)
          tank.newTank(function(tankMade) {
            if(tankMade) {
              // after a tank is made, create a new shot row with the tankId
              shot.newShot(tankMade, function(newShot){
                if(newShot){
                  game.enterGame( req.user.player_id, gameAvailable, tankMade,
                  function(gameEntered){
                    if(gameEntered){
                      gameNumber = gameAvailable;
                      res.redirect('/game/' + gameAvailable);
                    }else{
                      console.log("fail to enter game in routes");
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
              console.log(newShot);
              console.log("new shot: " + newShot.tank_id + ", " + newShot.angle + ", " + newShot.tank_power);
              game.newGame(req.user.player_id, tankMade, function(gameEntered){
                  if(gameEntered){
                    console.log("game " + gameEntered +" entered!!!");
                    gameNumber = gameEntered;
                    res.redirect('/game/' + gameEntered);
                  }else{
                    console.log("failed to enter new game, redirecting to lobby");
                    res.redirect('/lobby');
                  }
                });
              } else {

                res.redirect('/lobby');
                console.log("no new shots");
              }
            });
          });
        }

      });
  });

  return router;
}
