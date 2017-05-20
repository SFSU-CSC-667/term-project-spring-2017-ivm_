var express = require('express');
var router = express.Router();

var player = require('.././model/player.js');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', invalid_registration: '' });
});

router.post('/', function(req, res, next) {
    const user = req.body;

    if(user.passwordConfirm !== user.password) {
      res.render('register', { title: 'Register', invalid_registration: ' Passwords did not match. ' });
    } else {
      player.registerNewPlayer(res, req, function(status){
        if(status){
          res.redirect('../?registration=complete');
        } else {
          res.render('register', { title: 'Register', invalid_registration: ' Username or email already taken. ' });
        }
      });
    }
});

module.exports = router;
