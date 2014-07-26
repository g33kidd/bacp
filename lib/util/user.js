var models = require('../models');

module.exports.usernameTaken = function(username) {
  models.User.findByUsername(username, function(user) {
    if(!user) 
      return false;
    else
      return true;
  });
}

module.exports.emailUsed = function(email) {
  models.User.findByEmail(email, function(user){
    if(!user)
      return false;
    else
      return true;
  });
}

// Add this in later.
module.exports.destroyAccount = function(username, password) {
}