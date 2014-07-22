var debug = require('debug')('router');

module.exports = function(app) {
  debug('setting up routes...');

  app.get('/', function(req, res) {
    res.render('index', { title: 'Welcome to BACP!' });
  });

  app.get('/hi', function(req, res) {
    res.send('HI! IT DEFINITELY WORKS!')
  });

}