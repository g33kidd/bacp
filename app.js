var debug = require('debug')('app'),
    app = require('./lib/server'),
    db = require('./lib/db');

// Router Handlers
var basicHandler = require('./lib/handler/index')(db);
var userHandler = require('./lib/handler/user')(db);

require('./lib/config')(__dirname, app);
require('./lib/router')(app, basicHandler);
require('./lib/router/users')(app, userHandler);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port %d in %s mode', server.address().port, process.env.NODE_ENV);
});