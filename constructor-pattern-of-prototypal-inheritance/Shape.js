function Shape(left, top) {
  this.name = 'Shape';
  this.left = left || 0;
  this.top = top || 0;
}

Shape.prototype.setX = function(val) {
  return this.left = val;
};

Shape.prototype.setY = function(val) {
  return this.top = val;
};

Shape.prototype.getX = function() {
  return this.left;
};

Shape.prototype.getY = function() {
  return this.top;
};

module.exports = Shape;
