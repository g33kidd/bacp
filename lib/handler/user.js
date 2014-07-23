var debug = require('debug')('handler');
var LocalStrategy = require('passport-local').Strategy;

// Inject db for model manipulation.
module.exports = function(db) {
  debug('setting up user route handlers...');

  return {

    showProfile: function(req, res) {
      // user = db.User.findOne({'username':req.username});
      res.render('user/profile', { username: req.params.username });
    },

    showLogin: function(req, res) {
      res.render('user/login');
    },

    postLogin: function(req, res) {
      debug('trying...')
      req.passport.authenticate('local', function() {
        debug('working...');
      });
    }

  };
};