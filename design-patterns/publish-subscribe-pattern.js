/**
 * The Publish/Subscribe Pattern
 * It is a pattern in which an object maintains a list of objects depending on it,
 * automatically notifying them of any changes to state.
 * When a subject needs to notify observers about something interesting happening,
 * It broadcasts a notification to the observers.
 *
 * *****************************************************************************
 *
 * Pros:
 *   Be able to maintain consistency between related objects without making class-
 *   es tightly coupled.
 *
 * Cons:
 *   By decoupling publishers from subscribers, it can sometimes become difficult
 *   to obtain guarantees that particular parts of our applications are function-
 *   ing as we may expect.
 *   Another drawback of the pattern is that subscribers are quite ignorant to the
 *   existence of each other and are blind to the cost of switching publishers. Due
 *   to the dynamic relationship between subscribers and publishers, the update
 *   dependency can be difficult to track.
 */

var pubsub = (function() {
  var topics = {},
      subUid = -1;

  return {

    /**
     * Publish or broadcast events of interest with a specific topic name and
     * arguments such as the data to pass along.
     */
    publish: function(topic, args) {
      if (!topics[topic]) return false;

      var subscribers = topics[topic],
          len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func(topic, args);
      }

      return this;
    },

    /**
     * Subscribe to events of interest with a specific topic name and a callback
     * function, to be executed when the topic/event is observed.
     */
    subscribe: function(topic, func) {
      if (!topics[topic]) {
        topics[topic] = [];
      }

      var token = (++subUid).toString();
      var subscribers = topics[topic];

      subscribers.push({
        token: token,
        func: func
      });

      return token;
    },

    /**
     * Unsubscribe from a specific topic, based on a tokenized reference to the
     * subscription.
     */
    unsubscribe: function(token) {
      for (var m in topics) {
        var subscribers = topics[m];
        if (subscribers) {
          for (var i = 0, j = subscribers.length; i < j; ++i) {
            if (subscribers[i].token === token) {
              subscribers.splice(i, 1);
              return token;
            }
          }
        }
      }

      return this;
    }
  };
})();

// Usage ///////////////////////////////////////////////////////////////////////

var token = pubsub.subscribe('inbox/newMessage', function(topic, args) {
  console.log('%o is published with %o parameters', topic, args);
});

pubsub.publish('inbox/newMessage', 'hello world!');
pubsub.publish('inbox/newMessage', {sender: 'Nick',
                                    body: 'body'});

pubsub.unsubscribe(token);
