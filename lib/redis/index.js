var debug = require('debug')('redis'),
    redis = require('redis'),
    client = redis.createClient();

client.on('ready', function() {
  debug('redis connection ready...');
});

client.on('error', function(err) {
  debug('error: ' + err);
});

client.on('idle', function() {
  debug('idle...')
});

module.exports = client;