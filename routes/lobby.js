var express = require('express');
var router = express.Router();
const cb = require('.././model/chat.js');
const sb = require('.././model/scoreboard.js');

var chats = [];
var scores = [];

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {

        cb.getLobbyChats(function(error, result) {
            if (error) {
                console.log("Error loading lobby chats: " + error.statusCode)
            }
            chats = result.rows.reverse()

            sb.getScores(function(result, error) {
                if (error) {
                    console.log("error: " + error.statusCode);
                }

                let scores = result.rows.sort(function(a, b) {
                    return b.wins - a.wins;
                });

                this.scores = scores

                res.render('lobby', { title: 'Tank City Lobby', scores: scores, user: req.user, chats: chats });
            });
        })
    } else {
        res.render('index', { error: 'Log in to start game!' });
    }

});

router.post('/', function(req, res, next) {
    cb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result) {
        if (error) {
            console.log("Error inserting message for lobby: " + error.statusCode)
        }

        console.log("lobby chat logged")
    })
});

function updateScroll(elementId) {
    var element = document.getElementById(elementId);
    element.scrollTop = element.scrollHeight;
}

module.exports = router;