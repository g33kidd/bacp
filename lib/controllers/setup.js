var debug = require('debug')('controllers');

module.exports = function(models) {

  return {

    showSetup: function(req, res) {
      req.rclient.set('setup', true);
      res.render('setup/index');
    },

    setup: function(req, res) {
      var user = new models.User({
        username: req.body.username,
        emailAddress: req.body.email,
        password: req.body.password,
        name: { first: req.body.fname, last: req.body.lname }
      });

      user.save(function(err, user) {
        res.render('setup/finished');
      });
    }

  };

}