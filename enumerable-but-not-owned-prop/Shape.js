function Shape(left, top) {
  this.name = 'Shape';
  this.left = left || 0;
  this.top = top || 0;
}

Shape.prototype = {
  getX: function() { return this.left; },
  getY: function() { return this.top; }
};

module.exports = Shape;
