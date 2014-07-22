var express = require('express');
var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;

router.post('/new', function(req, res) {
  var db = req.db;

  var userName = req.body.username;
  var userEmail = req.body.email;
  var collection = db.get('usercollection');

  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }else{
      res.location("new");
      res.redirect("new");
    }
  });
});

router.get('/new', function(req, res) {
  res.render('new', { title: 'Add New User' });
});

router.get('/login', function(req, res) {
  res.render('user/login');
});

router.post('/login', function(req, res) {
  req.passport.use(new LocalStrategy(
    function(username, password, done) {
     
      process.nextTick(function () {
        db.collection('users').findOne({'username':username},
          function(err, user) {
              if (err) { return done(err); }
              if (!user) { return done(null, false); }
              if (user.password != password) { return done(null, false); }
              return done(null, user);
          });
      });
    }
  ));

  req.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
});

module.exports = router;
