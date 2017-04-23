var express = require('express');
var router = express.Router();
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
        res.render('index', { error: 'Log in to start game!' });
    }

    // sb.getScores(function(result, error) {
    //     if (error) {
    //         console.log("error: " + error.statusCode);
    //         res.render('lobby', { title: 'Lobby', scores: scores, user: req.user });
    //     }

    //     let scores = result.rows.sort(function(a, b) {
    //         return b.wins - a.wins;
    //     });

    //     res.render('lobby', { scores: scores, user: req.user });
    // });
});

router.post('/', function(req, res, next) {
    cb.insertMessageForLobby(req.user.player_id, req.user.username, req.body.message, function(error, result) {
        if (error) {
            console.log("Error inserting message for lobby: " + error.statusCode)
        }
        console.log("lobby chat logged")
    })
});

module.exports = router;