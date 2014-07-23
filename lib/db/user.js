var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  username: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }]
});

userSchema.statics.getAll = function(cb) {
  this.find({}, cb);
}

userSchema.statics.findByName = function(name, cb) {
  this.find({name: new RegExp(name, 'i')}, cb);
}

module.exports = mongoose.model('User', userSchema);