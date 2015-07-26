var Rectangle = require('./Rectangle');
var extend = require('./utils/extend');

function Square(left, top, side) {
  left = left || 0;
  top = top || 0;
  Rectangle.call(this, left, top, left + side, top + side);
}

Square.prototype.setSide = function(val) {
  this.right = this.left + val;
  this.bottom = this.top + val;
};

Square.prototype.getSide = function() {
  return this.right - this.left;
};

extend(Square, Rectangle);

module.exports = Square;
