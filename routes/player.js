module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var player = require('.././model/player.js');

    router.post('/', function(req, res, next) {
        player.addWin(req.body.userid, function(error) {
            if (error) {
                console.log("Error inserting message for game chat: " + error.statusCode);
            }
        })
    });

  return router;
}
