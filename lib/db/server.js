var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
  hostName:   String,
  ipAddr:     String,
  userName:   String
});

module.exports = mongoose.model('Server', serverSchema);