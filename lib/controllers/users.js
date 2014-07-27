var debug = require('debug')('controllers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userUtil = require('../util/user');

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

    listUsers: function(req, res) {
      models.User.find({}, function(err, users) {
        res.send(users);
      });
    },

    showNew: function(req, res) {
      res.render('new');
    },

    createUser: function(req, res) {
      var jsonResp = '{"messages": []}';
      var jResp = JSON.parse(jsonResp);
      console.log(req.body);
      userUtil.exists(req.body.username, req.body.email, function(response) {
        console.log(response);
        if(response.usernameTaken || response.emailTaken) {
          if(response.usernameTaken)
            jResp['messages'].push('{ "type": "error", "message": "Username has been taken." }');

          if(response.emailTaken)
            jResp['messages'].push('{ "type": "error", "message": "Email is already being used." }');

          res.status(406);
        }else{
          var user = new models.User({
            username: req.body.username,
            emailAddress: req.body.email,
            password: req.body.password,
            name: { first: req.body.fname, last: req.body.lname }
          });

          user.save(function(err, user) {
            if(err) { console.log(err); }
            debug(user);

            res.status(200);
            jResp['messages'].push('{ "type": "success", "message": "Created user!" }');
          });
        }
      });

      res.json(jResp);
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