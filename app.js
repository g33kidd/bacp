var debug = require('debug')('app'),
    app = require('./lib/server'),
    db = require('./lib/db');

require('./lib/config')(__dirname, app);
require('./lib/router')(app);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port %d in %s mode', server.address().port, process.env.NODE_ENV);
});