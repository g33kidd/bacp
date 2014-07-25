var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  name: {
    first: String,
    last: String
  },
  emailAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }]
});

user.statics.getAll = function(cb) {
  this.find({}, cb);
}

user.statics.findByName = function(name, cb) {
  this.find({name: new RegExp(name, 'i')}, cb);
}

module.exports = user;