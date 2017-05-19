module.exports = function(app, passport){

  var express = require('express');
  var router = express.Router();
  var player = require('.././model/player.js')
  //var user = require('.././user.js');

    router.post('/', function(req, res, next) {
        console.log("HERE player.js/post");
        player.addWin(req.body.userid, function(error) {
            if (error) {
                console.log("Error inserting message for game chat: " + error.statusCode)
            } else {
              console.log("^^^^^^^Player " + req.body.userid + " wins recorded");
            }
        })
    });


  return router;
}
