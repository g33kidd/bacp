var debug = require('debug')('router');

module.exports.setup = function(app, controllers) {
  debug("setting up routes...");

  var mainRoute = require('./main')(controllers.main);
  var userRoute = require('./users')(controllers.users);
  var setupRoute = require('./setup')(controllers.setup);

  app.use('/', mainRoute);
  app.use('/', userRoute);
  app.use('/', setupRoute);
}