var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('.././server/models/db.js');

/* GET home page. */
router.get('/', passport.authenticate('bearer', { session: true }),function(req, res, next) {
    db.query('SELECT first_name, wins FROM Player;', function(error, result){
        if (error){
            res.render('scoreboard', { title: 'Scoreboard' });
            return;
        }
        res.render('scoreboard', { title: 'Scoreboard' });
    });
});

module.exports = router;