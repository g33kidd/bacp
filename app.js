var debug = require('debug')('app'),
    app = require('./lib/server'),
    redis = require('./lib/redis');

var models = require('./lib/models');
var controllers = require('./lib/controllers');
var routes = require('./lib/routes');


// Setup config and routes... change config
// setup to method instead of this below.
require('./lib/config')(__dirname, app);
routes.setup(app, controllers);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port %d in %s mode', server.address().port, process.env.NODE_ENV);

  redis.get('installed', function(err, val) {
    if(err) throw(err);
    if(val == null) {
      redis.set('installed', false);
    }
  });

  redis.get('setup', function(err, val) {
    if(err) throw(err);
    if(val == null) {
      redis.set('setup', false);
    }
  });

});