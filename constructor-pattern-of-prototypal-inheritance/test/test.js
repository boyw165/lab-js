var path = require('path');
var Shape = require('../Shape');
var Rectangle = require('../Rectangle');
var Square = require('../Square');

require('shelljs/global');

console.log('========== Shape.js ==========');
console.log(cat(path.join(__dirname, '../Shape.js')));
console.log('========== Rectangle.js ==========');
console.log(cat(path.join(__dirname, '../Rectangle.js')));
console.log('========== Square.js ==========');
console.log(cat(path.join(__dirname, '../Square.js')));
console.log('==============================');

describe('Prototype based inheritance (classical inheritance)', function() {

  describe('# Prototype chain', function () {
    it('Square -> Rectangle -> Shape', function () {
      var q = new Square(5, 10, 100);
      var level = 0;

      function walk(instance) {
        if (instance.__proto__) {
          var prop = '.__proto__';

          for (var i = 0; i < level; ++i) {
            prop += '.__proto__';
          }

          console.log('\tnew Square()%s =', prop, instance.__proto__);
          ++level;
          walk(instance.__proto__);
        }
      }
      walk(q);

      console.log('');
      console.log('\tIs new Square() instanceof Rectangle? ', q instanceof Rectangle);
      console.log('\tIs new Square() instanceof Shape? ', q instanceof Shape);
    });
  });

  describe('# Lookup time for properties vs Duck-typing, ', function () {
    it('...', function () {
    });
  });
});
