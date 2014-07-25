var debug = require('debug')('app'),
    app = require('./lib/server'),
    redis = require('./lib/redis');

var models = require('./lib/models');
var controllers = require('./lib/controllers');
var routes = require('./lib/routes');

require('./lib/config')(__dirname, app);

routes.setup(app, controllers);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port %d in %s mode', server.address().port, process.env.NODE_ENV);
});