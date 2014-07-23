var debug = require('debug')('handler');
var redis = require('redis');

// Inject db for model manipulation.
module.exports = function(db) {
  debug('setting up installation route handlers...');

  return {

    showSetup: function(req, res) {
      req.rclient.set("installed", false, redis.print);
      req.rclient.set("setup-started", false, redis.print);
      res.render('setup/index');
    },

    setup: function(req, res) {

      var user = new db.User({
        name: { first: 'System', last: 'Administrator' },
        username: 'admin',
        emailAddress: req.body.email,
        password: req.body.password
      });

      user.save(function(err) {
        if (err) { debug('something went terribly wrong...'); }
        debug('admin user created and saved...');
        req.rclient.set("installed", true, redis.print);
        res.send('User has been created!');
      });

    }

  };
};