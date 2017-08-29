var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.model');

function ensureAdmin(req, res, next){
  if (req.user) {
    if (req.user.isAdmin)
      return next();
    else
      return res.send(401, 'Unauthorized');
  }
  return next();
}

router.get('/', ensureAdmin, function(req, res) {
  if (req.user)
    res.render('admin/admin-index');
  else res.redirect('/admin/login');
});

router.get('/login', function(req, res) {
  var errors = req.flash('error');
  if (errors.length) {
     res.render('admin/admin-login', {errors: errors});
  }
  res.render('admin/admin-login');
});

var passportAdminAuth = passport.authenticate('local', {
  failureRedirect: '/admin/login',
  failureFlash: 'Usuario o contraseña incorrectos'
});

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
    return res.render('admin/admin-login', {errors: errors});
  }
  next();
}

router.post('/auth', validateRegistration, passportAdminAuth, function(req, res) {
  // parametros post:
  var post = req.body;
  res.redirect('/admin');
});

function isEmail(email)
{
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

module.exports = router;
