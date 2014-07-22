var debug = require('debug')('config'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    sass = require('node-sass'),
    passport = require('passport');

module.exports = function(rootDir, app) {

  var viewPath = rootDir + '/views',
      staticPath = rootDir + '/public',
      sassPath = rootDir + '/public/sass/'
      cssPath = rootDir + '/public/css/';

  debug('setting up general configuration...');

  app.set('views', viewPath);
  app.set('view engine', 'jade');

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(logger('dev'));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());

  app.use(function(req, res, next) {
    req.passport = passport;
    next();
  });

  app.use(
    sass.middleware({
      src: sassPath,
      dest: cssPath,
      debug: true,
      outputStyle: 'compressed'
    }),
    express.static(staticPath)
  );

}