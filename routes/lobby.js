var express = require('express');
var router = express.Router();

var chats = [];
var scores = [];

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        if (scores.length > 0){
            res.render('lobby', { title: 'Tank City Lobby', scores: scores, user: req.user, chats: chats });
        }else{
            loadData(function(){
                res.render('lobby', { title: 'Tank City Lobby', scores: scores, user: req.user, chats: chats });
            })
        }
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


function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}

function loadData(callback){
    const sb = require('.././model/scoreboard.js');
    const cb = require('.././model/chat.js');

    sb.getScores(function(result, error) {
        if (error) {
            console.log("error: " + error.statusCode);
        }

        let scores = result.rows.sort(function(a, b) {
            return b.wins - a.wins;
        });

        this.scores = scores

        cb.getLobbyChats(function(error, result) {
            if (error) {
                console.log("Error loading lobby chats: " + error.statusCode)
            }
            chats = result.rows.reverse()
        })
    });
    callback()
}

module.exports = router;
