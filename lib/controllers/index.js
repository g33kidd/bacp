var debug = require('debug')('controllers');
var models = require('../models');

var main = require('./main')(models);
var users = require('./users')(models);
var setup = require('./setup')(models);

module.exports.main = main;
module.exports.users = users;
module.exports.setup = setup;