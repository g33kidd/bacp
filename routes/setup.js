var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('setup', { title: 'Setup BACP' });
});

router.post('/', function(req, res) {
  var db = req.db;

  var admin_email = req.body.adminEmail;
  var admin_password = req.body.adminPassword;

  db.createCollection("users", function(err, users) {
    console.log("Users Collection created!");
    users.insert({
      "username": "admin",
      "email": admin_email,
      "password": admin_password
    }, function(err, doc) {
      console.log("Admin User created!");
      res.location('login');
      res.redirect('login');
    });
  });

  db.createCollection("settings", function(err, settings) {
    console.log("Settings Collection created!");
  });

  db.createCollection("servers", function(err, servers) {
    console.log("Servers Collection created!");
  });

});

module.exports = router;