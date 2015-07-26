var Shape = require('./Shape');
var extend = require('./utils/extend');

function Rectangle(left, top, right, bottom) {
  left = left || 0;
  top = top || 0;
  Shape.call(this, left, top);

  this.right = right || 0;
  this.bottom = bottom || 0;
}

Rectangle.prototype.setWidth = function(val) {
  this.right = this.left + val;
};

Rectangle.prototype.setHeight = function(val) {
  this.bottom = this.top + val;
};

Rectangle.prototype.getWidth = function() {
  return this.right - this.left;
};

Rectangle.prototype.getHeight = function() {
  return this.bottom - this.top;
};

extend(Rectangle, Shape);

module.exports = Rectangle;
