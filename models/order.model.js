var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var orderSchema =  new Schema({
  pizza: String,
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  state: {
    type: String,
    enum: ['pendiente', 'sirviendo', 'listo'],
    default: 'pendiente'
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  email_on_ready: {
    type: Boolean,
    default: true
  },
  comments: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('order', orderSchema);
