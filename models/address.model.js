var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  alias: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  postcode: {
    type: Number
  },
  phone: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
});

module.exports = mongoose.model('address', addressSchema);
