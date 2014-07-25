var debug = require('debug')('controllers');

module.exports = function(models) {

  return {

    showIndex: function(req, res) {
      res.render('index');
    }

  };

}