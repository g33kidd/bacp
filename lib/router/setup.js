var debug = require('debug')('router');

module.exports = function(app, setupHandler) {
  debug('setting up installation routes...');

  app.get('/setup', setupHandler.showSetup);
  app.post('/setup', setupHandler.setup);
}