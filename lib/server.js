var debug = require('debug')('server');
var express = require('express');
var server;

debug('Creating Express Server...');
server = express();

module.exports = server;