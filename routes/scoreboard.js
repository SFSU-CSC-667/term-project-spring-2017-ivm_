var express = require('express');
var router = express.Router();
var sb = require('.././model/scoreboard.js');

/* GET scoreboard page. */
router.get('/', function(req, res, next) {
    sb.getScores(function(result, error) {
        if (error) {
            console.log("error: " + error.statusCode);
            res.render('scoreboard', { title: 'Scoreboard' });
        }

        logScoreboard(result.rows);

        let scores = result.rows.sort(function(a, b) {
            return b.wins - a.wins;
        });

        res.render('scoreboard', { scores: scores });
    });
});

function logScoreboard(scores) {
    console.log("==========================================");
    console.log("============= ( SCOREBOARD ) =============");
    console.log("==========================================");

    console.log("Name\t\t\tWins");

    let score = scores.sort(function(a, b) {
        return b.wins - a.wins;
    });

    for (var s = 0; s < score.length; s++) {
        console.log(score[s]["first_name"] + "\t\t\t" + score[s]["wins"]);
    }

    console.log("==========================================");
}

module.exports = router;