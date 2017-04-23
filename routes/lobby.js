var express = require('express');
var router = express.Router();
var sb = require('.././model/chat.js');

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()){
        res.render('lobby', { title: 'Tank City Lobby', user: req.user });
    }else{
        res.render('index', { error: 'Log in to start game!' });
    }
});

router.post('/', function(req, res, next) {
    console.log(req.user.player_id + " " +  req.body.message)
    sb.insertMessageForLobby(req.user.player_id, req.body.message, function(error, result){
        if(error){
            console.log("Error inserting message for lobby: " + error.statusCode)
        }
        console.log("Logged lobby chat logged: " + result)
    })
});

module.exports = router;
