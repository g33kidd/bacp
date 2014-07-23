var debug = require('debug')('router');

module.exports = function(app, userHandler) {
  debug('setting up user routes...');

  // User Login
  app.get('/login', userHandler.showLogin);
  app.post('/login', userHandler.postLogin);

  app.get('/user/:username', userHandler.showProfile)
}