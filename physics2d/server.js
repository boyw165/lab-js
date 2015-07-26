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
var test = require('./src/server/routes/test');

var server = express();
var db = monk('localhost:27017/pyhsics2d');

server.set('port', process.env.PORT || 3000);
// Use Jade as view engine.
server.set('views', path.join(__dirname, '/src/server/views'));
server.set('view engine', 'jade');

// Logger.
if (server.get('env') !== 'production') {
  server.use(logger('dev'));
}
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
// server.use(cookieParser());
// Static files.
server.use(express.static(global.BUILD_PUBLIC_DIR));
// Make our db accessible to our routers.
server.use(function (req, res, next) {
  req.db = db;
  next();
});
// Routers
server.use('/', index);
server.use('/test', test);

// Error handler.
if (server.get('env') === 'production') {
  server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
} else {
  server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

server.listen(server.get('port'), function() {
  console.log('Express started on http://localhost:' + server.get('port') +
              '; press Ctrl-C to terminate.');
});
