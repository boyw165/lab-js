/**
 * The Mediator Pattern
 * A Mediator is a behavioral design pattern that allows us to expose a unified
 * interface through which the different parts of a system may communicate.
 * In implementation terms, it is essentially a shared subject in the Observer
 * pattern.
 * Another analogy would be DOM event bubbling and event delegation.
 *
 * *****************************************************************************
 *
 * Pros:
 *   The largest benefit of the Mediator pattern is that it reduces the communi-
 *   cation channels needed between objects or components in a system from many
 *   to many to just many to one.
 * Cons:
 *   Placing a Mediator between modules can cause a performance hit as they are
 *   always communicating indirectly. Because of the nature of loose coupling,
 *   it's difficult to establish how a system might react by only looking at the
 *   broadcasts.
 */

module.exports =  Mediator;

function guidGen() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

// Subscriber //////////////////////////////////////////////////////////////////

/**
 * Subscribers are instances of Mediator Channel registrations. We generate an
 * object instance so that it can be updated later on without having to un-
 * register. Subscribers are constructed with a function to be called, options,
 * object and context.
 */
function Subscriber(fn, context) {
  if (!(this instanceof Subscriber)) {
    return new Subscriber(fn, context);
  }

  this.id = guidGen();
  this.fn = fn;
  this.context = context;
}

Subscriber.prototype = {
  update: function(data) {
    if (this.fn instanceof Function) {
      this.fn.apply(this.context, data);
    }
  }
};

// Channel /////////////////////////////////////////////////////////////////////

/**
 * A Mediator channel holds a list of sub-channels and subscribers to be fired
 * when Mediator.publish is called on the Mediator instance. It also contains
 * some methods to manipulate its lists of data; only setPriority and stopPro-
 * pagation are meant to be used. The other methods should be accessed through
 * the Mediator instance.
 */
function Channel(namespace) {
  if (!(this instanceof Channel)) {
    return new Channel(namespace);
  }

  this.namespace = namespace || '';
  this.stopped = false;

  this._subscribers = [];
  this._channels = [];
}

Channel.prototype = {
  addSubscriber: function(fn, context) {
    var subscriber = new Subscriber(fn, context);

    this._subscribers.push(subscriber);

    return subscriber;
  },

  removeSubscriber: function(id) {
    if (!id) {
      this._subscribers = [];
      return;
    }

    for (var i = this._subscribers.length - 1; i >= 0; --i) {
      if (this._subscribers[i].fn === id || this._subscribers[i].id === id) {
        this._subscribers.splice(x, 1);
      }
    }
  },

  stopPropagation: function() {
    this.stopped = true;
  },

  getSubscriber: function(id) {
    for (var i = this._subscribers.length - 1; i >= 0; --i) {
      if (this._subscribers[i].fn === id || this._subscribers[i].id === id) {
        return this._subscribers[i];
      }
    }
  },

  addChannel: function(channel) {
    this._channels[channel] = new Channel((this.namespace ? this.namespace + ':' : '') + channel, this);
  },

  hasChannel: function(channel) {
    return this._channels.hasOwnProperty(channel);
  },

  returnChannel: function(channel) {
    return this._channels[channel];
  },

  /**
   * Publish arbitrary arguments to subscribers recursively through sub-
   * channels.
   */
  publish: function(data) {
    // First level children.
    for (var i = 0, j = this._subscribers.length; i < j; ++i) {
      var subscriber = this._subscribers[i],
          args = data.slice(0);

      args.unshift(this.namespace, this);
      subscriber.update(args);

      if (this._subscribers.length < j) {
        --i;
        j = this._subscribers.length;
      }
    }

    // Sub-children.
    if (!this.stopped) {
      for (var c in this._channels) {
        var subChannel = this._channels[c];
        subChannel.publish(data);
      }
    }

    this.stopped = false;
  }
};

// Mediator ////////////////////////////////////////////////////////////////////

/**
 * A Mediator instance is the instance through which events are regisered and
 * removed from publish channels.
 */
function Mediator () {
  if (!(this instanceof Mediator)) {
    return new Mediator();
  }

  this._channels = new Channel('');
}

Mediator.prototype = {
  getChannel: function(namespace) {
    var channel = this._channels,
        namespaceHierarchy = namespace.split(':');

    if (namespace === '') {
      return channel;
    }

    if (namespaceHierarchy.length > 0) {
      for(var i = 0, j = namespaceHierarchy.length; i < j; i++) {
        if (!channel.hasChannel(namespaceHierarchy[i])) {
          channel.addChannel(namespaceHierarchy[i]);
        }

        channel = channel.returnChannel(namespaceHierarchy[i]);
      }
    }

    return channel;
  },

  subscribe: function(channelName, fn, context) {
    var channel = this.getChannel(channelName),
        sub = channel.addSubscriber(fn, context);
    return this;
  },

  getSubscriber: function(id, channel) {
    return this.getChannel(channel || '').getSubscriber(id);
  },

  remove: function(channelName, id) {
    this.getChannel(channel || '').removeSubscriber(id);
  },

  publish: function(channelName) {
    var args = Array.prototype.slice.call(arguments, 1),
        channel = this.getChannel(channelName);

    if (channel) {
      channel.publish(args);
    }
  }
};

// Mediator.Channel = Channel;
// Mediator.Subscriber = Subscriber;
