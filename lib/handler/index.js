var debug = require('debug')('handler');

// Inject db for model manipulation.
module.exports = function(db) {
  debug('setting up basic handlers...');

  return {

    showIndex: function(req, res) {
      res.render('index', { title: "Welcome to BACP!" });
    },

    showHi: function(req, res) {
      res.render('index', { title: "Hi! This definitely works!" });
    }

  };
};