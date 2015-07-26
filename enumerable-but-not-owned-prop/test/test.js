var path = require('path');
var Shape = require('../Shape');

require('shelljs/global');

console.log('========== Shape.js ==========');
console.log(cat(path.join(__dirname, '../Shape.js')));
console.log('==============================');

describe('Let\'s test Shape.js with for-in loop and hasOwnProperty tests:', function() {

  describe('# Shape object', function () {
    it('Shape is a Function instance, so it does\'t have enumerable properties.', function () {
      var counter = 0;
      for (var k in Shape) {
        if (tester.hasOwnProperty(k))
          console.log('\t"%s" is owned property and enumerable.', k);
        else
          console.log('\t"%s" is not owned property, but also enumerable.', k);
        ++counter;
      }
      if (counter === 0) console.log('\tHas no enumerable properties!!!');
    });
  });

  describe('# new Shape() object', function () {
    it('Yay, it has enumerable properties, either owned and non-owned.', function () {
      var counter = 0;
      var tester = new Shape();
      for (var k in tester) {
        if (tester.hasOwnProperty(k))
          console.log('\t"%s" is owned property and enumerable.', k);
        else
          console.log('\t"%s" is not owned property, but also enumerable.', k);
        ++counter;
      }
      if (counter === 0) console.log('\tHas no enumerable properties!!!');
    });
  });
});
