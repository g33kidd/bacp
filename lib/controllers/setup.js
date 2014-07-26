var debug = require('debug')('controllers');

module.exports = function(models) {

  return {

    showSetup: function(req, res) {
      res.send("Setup!");
    }

  };

}