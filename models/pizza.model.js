var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var pizzaSchema =  new Schema({
  name: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('pizza', pizzaSchema);
