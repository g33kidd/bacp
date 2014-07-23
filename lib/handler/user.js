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
      req.passport.use(new LocalStrategy(
        function(username, password, done) {

          process.nextTick(function() {
            db.User.findOne({'username': username}, function(err, user) {
              if(err) { return done(err); }
              if(!user) { return done(null, false); }
              if(user.password != password) { return done(null, false); }
              return done(null, user);
            });
          });

        }
      ));

      req.passport.authenticate('local', {
        successRedirect: '/login',
        failureRedirect: '/login'
      });
    }

  };
};