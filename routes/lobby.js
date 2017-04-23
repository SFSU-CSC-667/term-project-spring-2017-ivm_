var express = require('express');
var router = express.Router();
var sb = require('.././model/scoreboard.js');

router.get('/', function(req, res, next) {

    if (!req.isAuthenticated()) {
        res.render('index', { title: 'Home', error: "Must be logged in" });
    }

    sb.getScores(function(result, error) {
        if (error) {
            console.log("error: " + error.statusCode);
            res.render('lobby', { title: 'Lobby', scores: scores, user: req.user });
        }

        let scores = result.rows.sort(function(a, b) {
            return b.wins - a.wins;
        });

        res.render('lobby', { scores: scores, user: req.user });
    });
});

module.exports = router;