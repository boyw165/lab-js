function Shape(left, top) {
  this.name = 'Shape';
  this.left = left || 0;
  this.top = top || 0;
}

Shape.prototype = {
  getX: function() { return this.left; },
  getY: function() { return this.top; }
};

function Rectangle(left, top, right, bottom) {
  this.name = 'Shape';
  this.left = left || 0;
  this.top = top || 0;
  this.right = right || 0;
  this.bottom = bottom || 0;
}

Rectangle.prototype = {
  setWidth: function() { return this.right - this.left; },
  setHeight: function() { return this.bottom - this.top; }
};

/**
 * A function for purpose of doing prototype-based inheritance.
 */
function extend(subClass, superClass) {
  if ((subClass instanceof Function) &&
      (superClass instanceof Function)) {
    var cachedPrototype = Object.create(subClass.prototype || {});
    subClass.prototype = Object.create(superClass, cachedPrototype);
  }
}

module.exports = extend;
