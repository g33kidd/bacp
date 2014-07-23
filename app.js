var debug = require('debug')('app'),
    app = require('./lib/server'),
    redis = require('./lib/redis'),
    db = require('./lib/db');

// Router Handlers
var basicHandler = require('./lib/handler/index')(db);
var userHandler = require('./lib/handler/user')(db);
var setupHandler = require('./lib/handler/setup')(db);

require('./lib/config')(__dirname, app);
require('./lib/router')(app, basicHandler);
require('./lib/router/users')(app, userHandler);
require('./lib/router/setup')(app, setupHandler);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port %d in %s mode', server.address().port, process.env.NODE_ENV);
});