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

// <<<<<<< HEAD
// =======

  router.get('/:id', user.isLoggedIn, function(req, res, next) {
    cb.getLobbyChats(function(error, result) {
        if (error) {
            console.log("Error loading game chat: " + error.statusCode)
        }
        game.loadGame(req.params.id, function(gameUsers) {
            loadData(gameNumber, function() {
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
        //res.render('game', { title: 'Tank City Talks', user: req.user, chats: result.rows.reverse() });
    })
  });


  router.get('/',  user.isLoggedIn, function(req, res, next) {

      // gameAvailable callback argument is the game_id of the avaiable game.
      // it becomes 0 if there are no games available.
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
                    gameNumber = gameAvailable;
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

  // router.get('/exitAndJoin', user.isLoggedIn, function(req, res, next){
  // res.redirect('/game/')
  // });

  // router.get('/:id', user.isLoggedIn, function(req, res, next) {
  //   cb.getLobbyChats(function(error, result) {
  //       if (error) {
  //           console.log("Error loading game chat: " + error.statusCode)
  //       }
  //       game.loadGame(req.params.id, function(gameUsers) {
  //         console.log("req.params: " + req.params);
  //         // socket.on("leaveGame", function(data){
  //         //   req.body.playerId = data.user;
  //         //   req.body.gameId = data.game;
  //         //   next();
  //         // })
  //         // game.id in game.pug will get the id of the game, through req.params.
  //         res.render('game', { user: req.user, game: req.params, gameUsers: gameUsers.rows, numberPlayers: gameUsers.rows.length, title: 'Tank City Talks', /*user: req.user,*/ chats: result.rows});
  //       });
  //       //res.render('game', { title: 'Tank City Talks', user: req.user, chats: result.rows.reverse() });
  //   })
  // });


  // router.delete('/', function(req, res, next){
  //     console.log(req.body.playerId + " game deleted")
  //     game.deleteGameUserByPlayerIdAndGameId(req.body.playerId, req.body.gameId, function(err, result){
  //       console.log('game has been deleted');
  //       game.getGameById(req.gameId, function(result){
  //         if(err)
  //           console.log("ERROR DELETING GAME USER");
  //         if(result.rows.length === 0){
  //           game.deleteGameById(req.gameId, function(result){
  //               console.log("DELETED GAME " + req.body.gameId )
  //           });
  //         } else {
  //           console.log("DELETED GAME USER " + req.body.gameId  + " only.")
  //         }
  //       });
  //     });
  //   });

    router.post('/', function(req, res, next) {
        cb.insertMessageForGameId(gameNumber, req.user.player_id, req.user.username, req.body.message, function(error, result) {
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
