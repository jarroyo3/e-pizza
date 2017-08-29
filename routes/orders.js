var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.model');
var Pizza = require('../models/pizza.model');
var Order = require('../models/order.model');

/* GET pizzas listing. */
router.get('/', function(req, res) {
  var idPizza = req.query.pizza;
  if (idPizza) {
    Pizza.findById({_id: idPizza}, function(err, pizza){
      if (err) throw err;
      res.render('order', {pizza: pizza, user: req.user});
    })
  }
});

router.get('/:order', function(req, res) {
  Order.findOne({_id: req.params.order})
  .populate('customer')
  .exec(function(err, order){
    if (err) throw err;
    res.render('ordered', {order: order});
  })
});

router.post('/submit', function(req, res) {
  var form = req.body;
  var user = req.user;
  form.customer = user;
  if (form.customer && form.pizza) {
    Order.create(form, function(err, order){
      res.redirect('/order/' + order._id);
    })
  } else {
    return res.render('order');
  }
});

module.exports = router;
