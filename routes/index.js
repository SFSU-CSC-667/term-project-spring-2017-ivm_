module.exports = function(app, passport) {

  var express = require('express');
  var router = express.Router();
  var flash = require('connect-flash');
  var player = require('../model/player.js');
  var app = express();
  app.use(flash());
  router.use(flash());

  router.get('/', function(req, res, next) {
      if(req.query.registration === 'complete'){
        res.render('index', { title: 'Tank City', register_message: 'Registration Successful!', userName: '' });
      }else {
        res.render('index', { title: 'Tank City', register_message: '', userName: '' });
      }
  });

  router.post('/', passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/',
    failureFlash: true})
  );

 router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
 })

  return router;
}
