var models = require('../models');

module.exports.exists = function(username, email, callback) {

  var response = {
    usernameTaken: null,
    emailTaken: null
  };

  response.usernameTaken = models.User.findOne({username: username}, function(err, user) {
    if(err) { console.log(err); }

    if(!user)
      return false;
    else
      return true;
  });

  response.emailTaken = models.User.findOne({emailAddress: email}, function(err, user) {
    if(err) { console.log(err); }

    if(!user) 
      return false;
    else
      return true;
  });

  callback(response);
}