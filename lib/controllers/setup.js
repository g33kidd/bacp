var debug = require('debug')('controllers');

module.exports = function(models) {

  return {

    showLogin: function(req, res) {
      res.render('user/login');
    },

    login: function(req, res) {
      res.send("Logged in!");
    }

  };

}