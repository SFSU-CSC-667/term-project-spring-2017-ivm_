var express = require('express');
var router = express.Router();
var sb = require('.././model/scoreboard.js');

/* GET scoreboard page. */
router.get('/',function(req, res, next) {
    sb.getScores(function(result, error){
        if (error){
            console.log("error: " + error.statusCode);
        }
        console.log("my board: " + result);
    });

    res.render('scoreboard', { title: 'Scoreboard' });
});

module.exports = router;