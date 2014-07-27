var debug = require('debug')('controllers');

module.exports = function(models) {

  return {

    showSetup: function(req, res) {
      req.rclient.set('setup', true);
      res.render('setup/index');
    }

  };

}