var debug = require('debug')('findjs');
var fs = require('fs');
var path = require('path');

module.exports = function(dir) {
  var res = [];

  function walk(dir) {
    try {
      var files = fs.readdirSync(dir).map(function(file) {
        return path.join(dir, file);
      });
      var jsfiles = files.filter(function(file) {
        return !!file.match(/\.js$/i);
      });
      var dirs = files.filter(function(file) {
        return (fs.statSync(file).isDirectory() &&
                !!!file.match(/public$/i));
      });

      res = res.concat(jsfiles);
      dirs.forEach(walk);
    } catch (err) {
      // DO NOTHING
      debug(err);
    }
  }
  walk(dir);

  return res;
};
