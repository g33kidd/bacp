var debug = require('debug')('config'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    morgan = require('morgan'),
    express = require('express'),
    sass = require('node-sass'),
    passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var rclient = require('./redis');

module.exports = function(rootDir, app) {

  var viewPath = rootDir + '/views',
      staticPath = rootDir + '/public',
      sassPath = rootDir + '/public/sass',
      cssPath = rootDir + '/public/css';

  debug('setting up general configuration...');

  app.set('views', viewPath);
  app.set('view engine', 'jade');

  app.use(morgan('dev'));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    req.rclient = rclient;
    req.passport = passport;
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
    next();
  });

  app.use(
    sass.middleware({
      src: rootDir + '/public/scss', 
      dest: rootDir + '/public/stylesheets',
      debug: true,
      outputStyle: 'compressed',
      prefix: '/stylesheets'
    })
  );

  // Make params variable in each req.
  app.param(function(name, fn){
    if (fn instanceof RegExp) {
      return function(req, res, next, val){
        var captures;
        if (captures = fn.exec(String(val))) {
          req.params[name] = captures;
          next();
        } else {
          next('route');
        }
      }
    }
  });

  app.use(express.static(staticPath));

}