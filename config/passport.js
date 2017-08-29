var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var _ = require('lodash');
var User = require('../models/user.model');
var debug = require('debug');

passport.serializeUser(function(user,done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    var userinfo = _.pick(user, 'name', 'lastname', 'email', '_id', 'isAdmin');
    done(err, userinfo);
  })
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
    User.findByUserEmail(email, function(err, user) {
      if (err) { return done(err); }
      if (!user || (user.password != password)) {
        return done(null, false, { message: 'Email o contraseña incorrectos.' });
      }
      return done(null, _.pick(user, 'name', 'lastname', 'email', '_id'));
    });
  }
));

module.exports = passport;
