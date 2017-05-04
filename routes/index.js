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
module.exports = function(app, passport) {

  var express = require('express');
  var router = express.Router();

  /* GET home page. */
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
    failureFlash: 'Username or password invalid'})
  );

 router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
 })

  return router;
}
