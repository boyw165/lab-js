var debug = require('debug')('build');
var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
var reactTools = require('react-tools');
var browserify = require('browserify');

var global = require('./global');
// Utils.
var findjs = require('./src/server/findjs');

fsExtra.removeSync(global.BUILD_DIR);
fsExtra.copySync(global.SERVER_PUBLIC_DIR, global.PUBLIC_DIR);
fsExtra.copySync(global.CLIENT_DIR, global.BUILD_DIR);

var jsfiles = findjs(global.BUILD_DIR);

// ReactJS: Transform JSX into vanilla JS.
console.log('===== JSX Build =====');
jsfiles.forEach(function(filePath) {
  try {
    console.log('[Build] %s', filePath);
    var input = fs.readFileSync(filePath, {encoding: 'utf8'});
    var output = reactTools.transform(input);

    fs.writeFileSync(filePath, output, {encoding: 'utf8'});
  } catch (err) {
    debug('Cannot read/write %s', filePath);
  }
});

// Browserify node modules.
console.log('\n===== Browserify Build =====');
var b = browserify(jsfiles);
b.bundle(function(err, buf) {
  fsExtra.outputFileSync(global.BUNDLE_JS, buf);
  console.log('[Build] %s', global.BUNDLE_JS);
});
