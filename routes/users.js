var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.model');
var id = 0;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
  var errors = req.flash('error');
  if (errors.length) {
     res.render('login', {errors: errors});
  }
  res.render('login');
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

router.get('/register', function(req, res) {
  res.render('register');
})

var passportAuth = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Usuario o contraseña incorrectos'
})

var validateRegistration = function(req, res, next) {
  var post = req.body;
  var errors = [];
  if (!post.email) {
    errors.push("El email no puede estar vacío.");
  }

  if (!post.password) {
    errors.push("La contraseña no puede estar vacía.");
  }

  if (!isEmail(post.email)) {
    errors.push("Introduce un email válido.");
  }

  if (errors.length) {
    return res.render('login', {errors: errors});
  }
  next();
}

router.post('/auth', validateRegistration, passportAuth, function(req, res) {
  // parametros post:
  var post = req.body;
  res.redirect('/');
})

router.post('/register', function(req, res) {
  var post = req.body;
  post.isAdmin = 0;
  var errors = [];
  if (!post.name) {
    errors.push("El nombre no puede estar vacío.");
  }

  if (!post.lastname) {
    errors.push("Los apellidos no pueden estar vacío.");
  }

  if (!post.email) {
    errors.push("El apellido no puede estar vacío.");
  }

  if (!post.password || !post.password_confirmation) {
    errors.push("La contraseña y la confirmación no pueden estar vacíos.");
  } else if (post.password !== post.password_confirmation) {
    errors.push("La contraseña y la confirmación no coinciden.");
  }

  if (!isEmail(post.email)) {
    errors.push("Introduce un email válido.");
  }

  if (errors.length) {
    return res.render('register', {errors: errors});
  }

  User.create(post, function(err, result){
    if (err) throw err;
    req.login(result, function(err){
      if (err) throw err;
      res.redirect('/');
    });
  })
});

function isEmail(email)
{
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

module.exports = router;
