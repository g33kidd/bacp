var debug = require('debug')('router');
var express = require('express');

module.exports = function(controller) {
  var router = express.Router();
  debug('setting up user routes');

  router.get('/login', controller.showLogin);
  router.post('/login', controller.postLogin);

  router.get('/users/list', controller.listUsers);
  router.post('/users/create', controller.createUser);
  // router.get('/user/:username', controller.showProfile);

  return router;
}