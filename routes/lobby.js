var express = require('express');
var router = express.Router();
<<<<<<< HEAD
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
=======
var sb = require('.././model/scoreboard.js');
var cb = require('.././model/chat.js');


router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        sb.getScores(function(result, error) {
            if (error) {
                console.log("error: " + error.statusCode);
            }

            let scores = result.rows.sort(function(a, b) {
                return b.wins - a.wins;
            });

            cb.getLobbyChats(function(error, result) {
                if (error) {
                    console.log("Error loading lobby chats: " + error.statusCode)
                }
                res.render('lobby', { title: 'Tank City Lobby', scores: scores, user: req.user, chats: result.rows.reverse() });
            })
        });
    } else {
>>>>>>> development
        res.render('index', { error: 'Log in to start game!' });
    }
});

router.post('/', function(req, res, next) {
<<<<<<< HEAD
    sb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result){
        if(error){
=======
    cb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result) {
        if (error) {
>>>>>>> development
            console.log("Error inserting message for lobby: " + error.statusCode)
        }
        console.log("lobby chat logged")
    })
});

module.exports = router;

function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}