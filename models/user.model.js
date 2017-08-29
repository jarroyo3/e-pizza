var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema =  new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'address'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.statics.findByUserEmail = function(email, callback) {
  this.model('user').findOne({email: email}, callback);
};

module.exports = mongoose.model('user', userSchema);
