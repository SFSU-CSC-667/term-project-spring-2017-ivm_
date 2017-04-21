


/*passport.use(new Strategy(
  function(token, done) {
    player.loginPlayer(token, function (err, user) {
      if (err) { console.log("err"); return done(err); }
      if (!user) { console.log("!user"); return done(null, false); }
      console.log("done");
      return done(null, user, { scope: 'all' });
    });
  }
));*/

//var app = require('.././app.js');
module.exports = function(app, passport) {

  var express = require('express');
  var router = express.Router();
  //var passport = require('passport');

  // //var Strategy = require('passport-http-bearer').Strategy;
  // var Strategy = require('passport-http').BasicStrategy;
  // var LocalStrategy = require('passport-local').Strategy;
  var player = require('../model/player.js');
  //
  // passport.serializeUser(function(user, cb) {
  //   cb(null, user.username);
  // });
  //
  // passport.deserializeUser(function(username, cb) {
  //   db.users.findByUsername(username, function (err, user) {
  //     if (err) { return cb(err); }
  //     cb(null, user);
  //   });
  // });


  /*passport.use(new Strategy(
    function(username, password, cb) {
      player.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));*/
    // uncomment this 4/20/17
  // passport.use(new LocalStrategy(
  //   {
  //     usernameField: 'username',
  //     passwordField: 'password',
  //      passReqToCallback : true
  //   },
  //   function(req, username, password, cb) {
  //     //process.nextTick(function() {
  //       player.findByUsername(username, function(err, user) {
  //           if (err) { console.log("ER"); return cb(err); }
  //           if (!user) { console.log('here');return cb(null, false/*,req.flash('loginMessage', 'Oops! invalid user.')*/); }
  //           if (user.password != password) { console.log('passwords not eq');return cb(null, false /*,req.flash('loginMessage', 'Oops! Wrong password.')*/); }
  //           console.log('good@#!!!!#@!$');
  //           return cb(null, user);
  //         });
  //     //});
  //     }));




  /* GET home page. */
  router.get('/', function(req, res, next) {
    // the registration=complete query string is a result of completing registration,
    // which takes the visitor back to the home page with the 'Registration Successful!' message.
      if(req.query.registration === 'complete'){
        res.render('index', { title: 'Tank City', register_message: 'Registration Successful!' });
      }else {
        res.render('index', { title: 'Tank City', register_message: '' });
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
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: 'Username or password invalid'})
  );

 router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
 })



  // replaces exports.router = router;
  return router;
  //exports.router = router;
}
