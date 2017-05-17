module.exports = function(passport){

  var LocalStrategy = require('passport-local').Strategy;
  var player = require('../model/player.js');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
       passReqToCallback : true
    },
    function(req, username, password, cb) {
        player.findByUsername(username, function(err, user) {
            if (err) {
                console.log(err);
                return cb(err);
            }

            if (!user) {
                console.log('here');
                return cb(null, false);
            }

            if (user.password != password) {
                console.log('passwords not eq');
                return cb(null, false );
            }

            console.log('good@#!!!!#@!$');
            return cb(null, user);
          });
      }));
}
