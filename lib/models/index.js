var debug = require('debug')('models'),
    mongoose = require('mongoose'),
    connection = 'mongodb://localhost:27017/bacp';

// Models
var user = require('./schema/user');
var server = require('./schema/server');

// module.exports.setup = function(connection) {
//   mongoose.connect(connection);
// }

mongoose.connect(connection);
debug('connecting to database...');

mongoose.connection.on('open', function() {
  debug('Mongo connected.');
});

mongoose.connection.on('close', function() {
  debug('Mongo closed.');
});

module.exports.User = mongoose.model('User', user);
module.exports.Server = mongoose.model('Server', server);