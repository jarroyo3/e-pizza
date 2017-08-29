var express = require('express');
var router = express.Router();
var Pizza = require('../models/pizza.model');

/*
Pizza.create(
  {
    name: 'mixta',
    title: 'Mixta',
    subtitle: 'Varios ingredientes',
    description: 'Riquisima',
    image: 'http://marijazaric.com/leonardo-pizza/img/photo-a.jpg'

  }
  ,function(error, pizza){
  if (error) {
      throw error;
  }

});

Pizza.create(
  {
    name: 'cuatro-quesos',
    title: 'Cuatro Quesos',
    subtitle: 'con extra de mozarella',
    description: 'Para los apasinados al queso',
    image: 'http://marijazaric.com/leonardo-pizza/img/photo-b.jpg'

  }
  ,function(error, pizza){
  if (error) {
      throw error;
  }

});

Pizza.create(
  {
    name: 'barbacoa',
    title: 'Pizza Barbacoa',
    subtitle: 'con salsa barbacoa',
    description: 'Pizza a la barbacoa con Jack Daniels',
    image: 'http://marijazaric.com/leonardo-pizza/img/photo-c.jpg'

  }
  ,function(error, pizza){
  if (error) {
      throw error;
  }

});

Pizza.create(
  {
    name: 'carbonara',
    title: 'Carbonara',
    subtitle: 'con bacon',
    description: 'La mejor salsa carbonara',
    image: 'http://marijazaric.com/leonardo-pizza/img/photo-d.jpg'

  }
  ,function(error, pizza){
  if (error) {
      throw error;
  }

});*/

/* GET home page. */
router.get('/', function(req, res) {
  Pizza.find({}).exec(function(err, pizzas){
      if (err) throw err;
      res.render('index', { pizzas: pizzas, user: req.user });
  });

//  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
