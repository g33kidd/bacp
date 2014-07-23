var debug = require('debug')('router');

module.exports = function(app, basicHandler) {
  debug('setting up basic routes...');

  app.get('/', basicHandler.showIndex);
  app.get('/hi', basicHandler.showHi);
}