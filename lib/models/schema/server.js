var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var server = new Schema({
  _id:        Number,
  hostName:   String,
  ipAddr:     String,
  userName:   String
});

module.exports = server;