var debug = require('debug')('db'),
    mongoose = require('mongoose'),
    connection = 'mongodb://localhost:27017/bacp';

// Models
var user = require('./user');
var server = require('./server');

// Connection Stuff


mongoose.connect(connection);
debug('connecting to database...');

mongoose.connection.on('open', function() {
  debug('Mongo connected.');
});

mongoose.connection.on('close', function() {
  debug('Mongo closed.');
});

module.exports.User = user;