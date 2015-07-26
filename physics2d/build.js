var debug = require('debug')('build');
var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
var reactTools = require('react-tools');
var browserify = require('browserify');
var babelify = require('babelify');

var global = require('./global');
// Utils.
var findjs = require('./src/server/findjs');

fsExtra.removeSync(global.BUILD_DIR);
fsExtra.copySync(global.SERVER_PUBLIC_DIR, global.BUILD_PUBLIC_DIR);
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
console.log('[Build] %s', global.BUILD_BUNDLE_JS);
browserify({ debug: true })
  .transform(babelify)
  .require(path.join(global.BUILD_DIR, '/index.js'), { entry: true })
  .bundle()
  .on('error', function(err) {
    throw new Error('Browserify Error: ' + err.message);
  })
  .pipe(fs.createWriteStream(global.BUILD_BUNDLE_JS));
