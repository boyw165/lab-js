var assert = require('assert');
var Mediator = require('../mediator-pattern');

describe('Mediator', function() {
  var m = new Mediator();

  m.subscribe('channel1', function(channel) {
    console.log('"', channel, '"', 'get notification');
  })
    .subscribe('channel1:sub', function(channel) {
      console.log('"', channel, '"', 'get notification');
    })
    .subscribe('channel1:sub:sub', function(channel) {
      console.log('"', channel, '"', 'get notification');
    });

  describe('1st layer, propagation enabled', function() {
    it('Publish successfully', function() {
      m.publish('channel1', 1, 2, 3);
    });
  });

  describe('2nd layer, propagation enabled', function() {
    it('Publish successfully', function() {
      m.publish('channel1:sub', 1, 2, 3);
    });
  });
});
