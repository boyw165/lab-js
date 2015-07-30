var debug = require('debug')('findjs');
var fs = require('fs');
var path = require('path');

function isEntryJS(filePath) {
  return !!filePath.match(/entries[\/].+\.js$/i);
}

// TODO: find entry JS files.
module.exports = function(dir) {
  var res = [];

  function walk(dir) {
    try {
      var files = fs.readdirSync(dir).map(function(file) {
        return path.join(dir, file);
      });
      var jsfiles = files.filter(function(file) {
        return isEntryJS(file);
      });
      var dirs = files.filter(function(file) {
        return fs.statSync(file).isDirectory();
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
