var express = require('express');
var router = express.Router();
var sb = require('.././model/chat.js');

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()){
        sb.getLobbyChats(function(error, result){
          if (error){
              console.log("Error loading lobby chats: " + error.statusCode)
          }
          res.render('lobby', { title: 'Tank City Lobby', user: req.user, chats: result.rows.reverse() });
        })
    }else{
        res.render('index', { error: 'Log in to start game!' });
    }
});

router.post('/', function(req, res, next) {
    sb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result){
        if(error){
            console.log("Error inserting message for lobby: " + error.statusCode)
        }
        console.log("lobby chat logged")
    })
});

module.exports = router;
