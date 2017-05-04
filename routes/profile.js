module.exports = function(app, passport){
  const express = require('express');
  const router = express.Router();
  const user = require('.././user.js');

  router.get('/', user.isLoggedIn, function(req, res, next) {
      res.render('profile', {userName: req.user.username,
          name: req.user.first_name + ' ' + req.user.last_name,
          email: req.user.email});
  });
  return router;
}
