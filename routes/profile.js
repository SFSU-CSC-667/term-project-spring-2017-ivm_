module.exports = function(app, passport) {

    var express = require('express');
    var router = express.Router();
    var user = require('.././user.js');
    var player = require('../model/player.js');
    var db = require('.././server/models/db.js');
    var userID = 0;

    router.get('/', user.isLoggedIn, function (req, res, next) {
        // allows all users to be rendered in profile.pug
        var result = db.query('SELECT * FROM Player WHERE username = \'' + req.user.username + '\';', function (err, result) {
            if (err) console.log(err);
            userID = req.user.player_id;
            res.render('profile', {
                query_rows: result.rows, userName: req.user.username,
                firstName: req.user.first_name,
                lastName: req.user.last_name,
                email: req.user.email,
                password: req.user.password,
                player_id: req.user.id
            });
        });
    });

    router.post('/', function(req, res, next) {
        req.body.id = userID;
        const user = req.body;
        console.log(user);
        player.updateUserProfile(user, function(error, result){
            res.render('profile');
        });
    });

  return router;
}

// this checks if the user is logged in, if not, it redirects to homepage.
// function isLoggedIn(req, res, next) {
//
//     if (req.isAuthenticated()){
//         console.log(req.user.username);
//         return next();
//     }
//
//     res.redirect('/');
// }
