var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var monk = require('monk');

var global = require('./global');
// Routers.
var index = require('./src/server/routes/index');
var editor = require('./src/server/routes/editor');

var server = express();
var db = monk('localhost:27017/pyhsics2d');

server.set('port', process.env.PORT || 5000);
// Use Jade as view engine.
server.set('views', path.join(__dirname, '/src/server/views'));
server.set('view engine', 'jade');

// Logger.
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
// Static files.
server.use(express.static(global.BUILD_DIR));
// Make our db accessible to our routers.
server.use(function (req, res, next) {
  req.db = db;
  next();
});
// Routers
server.use('/', index);
server.use('/editor', editor);

// 404 (Not Found) handler.
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler.
server.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: server.get('env') === 'production' ? {} : err
  });
});

server.listen(server.get('port'), function() {
  console.log('Express started on http://localhost:' + server.get('port') +
              '; press Ctrl-C to terminate.');
});
