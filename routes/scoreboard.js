var express = require('express');
var router = express.Router();
var sb = require('.././model/scoreboard.js');

/* GET scoreboard page. */
router.get('/',function(req, res, next) {
    sb.getScores(function(result, error){
        if (error){
            console.log("error: " + error.statusCode);
            res.render('scoreboard', { title: 'Scoreboard' });
        }

        logScoreboard(result.rows);
        res.render('scoreboard', { scores: result.rows });
    });
});

function logScoreboard(scores){
    console.log("==========================================");
    console.log("============= ( SCOREBOARD ) =============");
    console.log("==========================================");

    console.log("Name\t\t\tWins");

    for (var s = 0; s < scores.length; s++) {
        console.log(scores[s]["first_name"] + "\t\t\t" + scores[s]["wins"]);
    }

    console.log("==========================================");
}

module.exports = router;