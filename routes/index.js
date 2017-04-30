//var app = require('.././app.js');
module.exports = function(app, passport) {

  var express = require('express');
  var router = express.Router();
  var flash = require('connect-flash');
  //var passport = require('passport');

  // //var Strategy = require('passport-http-bearer').Strategy;
  // var Strategy = require('passport-http').BasicStrategy;
  // var LocalStrategy = require('passport-local').Strategy;
  var player = require('../model/player.js');
  var app = express();
  app.use(flash());
  router.use(flash());

  /* GET home page. */
  router.get('/', function(req, res, next) {
    // the registration=complete query string is a result of completing registration,
    // which takes the visitor back to the home page with the 'Registration Successful!' message.
      if(req.query.registration === 'complete'){
        res.render('index', { title: 'Tank City', register_message: 'Registration Successful!', userName: '' });
      }else {
        res.render('index', { title: 'Tank City', register_message: '', userName: '' });
      }
  });

  /*router.post('/', function(req, res, next) {

      player.loginPlayer(req, function(status){
        if(status) {
          console.log('success');
          res.redirect('../profile');
        }else {
          console.log('fail');
          res.redirect('../register');
        }
      });
  })*/

  /*router.post('/', passport.authenticate('local', { session: false }),
  function(req, res){
    res.redirect('lobby');
  });*/

  // passport = app.passport;

  router.post('/', passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/',
    failureFlash: true})
  );

 router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
 })

  // replaces exports.router = router;
  return router;
  //exports.router = router;
}
