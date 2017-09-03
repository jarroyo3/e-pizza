var express = require('express');
var router = express.Router();
var Address = require('../models/address.model');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && !req.user.isAdmin) {
    return next();

  }

  return res.redirect('/user/login');
}

router.get('/', ensureAuthenticated, function(req, res){
  res.render('my-account', {user: req.user});
})

router.get('/address', ensureAuthenticated, function(req, res){
  res.render('address', {user: req.user});
});

router.post('/newAddress', ensureAuthenticated, function(req, res){
  var post = req.body;
  var errors = [];
  if (!post.alias) {
    errors.push("Tienes que introducir un alias para la dirección.");
  }

  if (!post.address) {
    errors.push("Tienes que añadir la dirección.");
  }

  if (!post.city) {
    errors.push("La ciudad no puede estar vacía.");
  }

  if (!post.postcode) {
    errors.push("El código postal debe ser introducido.");
  }

  if (!post.phone) {
    errors.push("Tienes que añadir un teléfono o su formato no es correcto.");
  }

  if (errors.length) {
    return res.render('address', {errors: errors});
  }
  post.user = req.user;
  Address.create(post, function(err, result){
    if (err) throw err;
    var success = {
      message: "La dirección se ha creado con éxito."
    };
    res.render('address', {success: success, user: req.user});
  });
});


module.exports = router;
