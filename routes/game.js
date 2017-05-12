module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var db = require('.././server/db.js');
  var cb = require('.././model/chat.js');
  var game = require('.././model/game.js')
  var tank = require('.././model/tank.js')
  var user = require('.././user.js');
  var shot = require('.././model/shot.js')


  var thisGameID = 0;

  var chats = [];

  router.get('/',  user.isLoggedIn, function(req, res, next) {
      console.log('routes/game.js /');

      // gameAvailable callback argument is the game_id of the avaiable game.
      // it becomes 0 if there are no games available.
      game.getGameAvailable(req.user.player_id, function( gameAvailable){
        //thisGameID = gameAvailable;
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
                  //thisGameID = gameEntered;
                  if(gameEntered){
                    console.log("game " + gameEntered +" entered!!!");
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

  router.get('/:id', /*user.isLoggedIn,*/ function(req, res, next) {
      thisGameID = req.params.id;
      loadData(thisGameID, function(){
          res.render('game', { title: 'Tank City Talks', user: req.user, chats: chats });
      })
  });

  router.post('/', function(req, res, next) {
     cb.insertMessageForGameId(thisGameID, req.user.player_id, req.user.username, req.body.message, function(error, result) {
        if (error) {
          console.log("Error inserting message for game chat: " + error.statusCode)
        }
     })
  });

  function loadData(game_id, callback){
      cb.getAllChatsWithGameId(game_id, function (error, result) {
          if (error) {
              console.log("Error loading game chat: " + error.statusCode)
          }
          chats = result.rows;
      });
      callback()
  }

  return router;
}
