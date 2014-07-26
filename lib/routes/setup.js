var debug = require('debug')('router');
var express = require('express');

module.exports = function(controller) {
  var router = express.Router();
  debug('setting up main routes');

  router.get('/setup', controller.showSetup);
  // router.get('/setup', controller.showSetup);
  // router.post('/setup', controller.setup);

  return router;
}