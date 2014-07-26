var debug = require('debug')('controllers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(models) {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      models.User.find({username: username}, function(err, user) {
        if(err) {
          return done(err);
        }

        if(!user) {
          debug('Wrong Username!');
          return done(null, false, {message: "authentication:wrong_pass_or_username"});
        }else if(user.password != password) {
          debug('Wrong Password!');
          return done(null, false, {message: "authentication:wrong_pass_or_username"});
        }

        debug('Authenticated!');
        return done(null, user);
      });
    }
  ));

  return {

    showNew: function(req, res) {
      res.render('new');
    },

    createUser: function(req, res) {
      models.User.create({
        username: req.body.username,
        emailAddress: req.body.email,
        password: req.body.password,
        name: { first: req.body.fname, last: req.body.lname }
      });
    },

    showLogin: function(req, res) {
      res.render('user/login');
    },

    postLogin: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if(err) {
          return next(err);
        }

        if(!user) {
          return res.redirect('/login');
        }

        return res.redirect('/');
      })(req, res, next);
    }

  };

}