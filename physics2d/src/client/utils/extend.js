/**
 * A function for the purpose of doing constructor pattern of
 * prototypal inheritance.
 * http://aaditmshah.github.io/why-prototypal-inheritance-matters/
 *
 * @param {Function} subClass
 * @param {Function} superClass
 */
function extend(subClass, superClass) {
  if ((subClass instanceof Function) &&
      (superClass instanceof Function)) {
    var oldProto = subClass.prototype || {};
    // We use prototypal pattern of prototypal inheritance instead of constructor
    // pattern, say new operator.
    // e.g. new superClass() is a constructor pattern of prototypal inheritance.
    var newProto = Object.create(superClass.prototype);

    superClass.prototype.constructor = superClass;
    subClass.prototype = newProto;
    // Restore the old constructor since the assignment to subClass.prototype
    // kills the existing one.
    subClass.prototype.constructor = subClass;
    // Override the super Class properties with sub Class ones.
    for (var k in oldProto) {
      if (oldProto.hasOwnProperty(k)) {
        newProto[k] = oldProto[k];
      }
    }
  }
}

module.exports = extend;
