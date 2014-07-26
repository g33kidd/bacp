var debug = require('debug')('router');
var redis = require('../redis');

module.exports.setup = function(app, controllers) {
  debug("setting up routes...");

  if(redis.get('installed') && !redis.get('setup')) {
    var mainRoute = require('./main')(controllers.main);
    var userRoute = require('./users')(controllers.users);

    app.use('/', mainRoute);
    app.use('/', userRoute);
  }else{
    var setupRoute = require('./setup')(controllers.setup);
    app.use('/', setupRoute);
  }

}