var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.model');
var Order = require('../models/order.model');

function isAdminAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin)
   return next();
   var errors = req.flash('error');
   if (errors.length) {
     res.render('admin/admin-login', {errors: errors});
   }
   return res.render('admin/admin-login');
}

router.get('/', isAdminAuthenticated, function(req, res) {
  res.redirect('/admin/orders');
});

router.get('/login', isAdminAuthenticated, function(req, res) {
  res.redirect('/admin/orders');
});

router.get('/logout', function(req, res) {
  console.log('entra');
  req.logout();
  res.redirect('/admin');
})

router.get('/orders', isAdminAuthenticated, function(req, res) {
    Order.find({})
    .populate('customer')
    .exec(function(err, orders){
      if (err) throw err;
      var adminUser = null;
      if (req.user) {
        adminUser = req.user;
      }
      var status = [
        'pendiente',
        'sirviendo',
        'listo'
      ];
      res.render('admin/admin-orders', {adminUser: adminUser, orders: orders, status: status});
    })

});

router.post('/orders/updateOrderStatus', isAdminAuthenticated, function(req, res) {
  var idOrder = req.body.idOrder;
  var newOrderStatus = req.body.orderStatus;
  Order.update({_id: idOrder}, {"$set": {state: newOrderStatus}})
  .exec(function(err, order){
    if (err) throw err;
    res.redirect('/admin/orders');
  })

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
