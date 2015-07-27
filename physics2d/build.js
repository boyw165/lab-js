var fs = require('fs');
var path = require('path');
var fsExtra = require('fs-extra');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');

var global = require('./global');

fsExtra.removeSync(global.BUILD_DIR);
fsExtra.copySync(global.SERVER_PUBLIC_DIR, global.BUILD_PUBLIC_DIR);
fsExtra.copySync(global.CLIENT_DIR, global.BUILD_DIR);

// Browserify node modules.
console.log('===== Browserify Build =====');
browserify({ debug: true })
  .on('file', function(file, id, parent) {
    console.log('[Build] %s', path.relative(__dirname, file));
  })
  .on('error', function(err) {
    throw new Error('Browserify Error: ' + err.message);
  })
  .require(path.join(global.BUILD_DIR, '/index.js'), { entry: true })
// ES6 to ES5.
  .transform(babelify)
// JSX to vanilla JS.
  .transform(reactify)
  .bundle()
  .pipe(fs.createWriteStream(global.BUILD_BUNDLE_JS));
