/**
 * The Observer Pattern
 * It is a pattern in which an object maintains a list of objects depending on it,
 * automatically notifying them of any changes to state.
 * When a subject needs to notify observers about something interesting happening,
 * It broadcasts a notification to the observers.
 *
 * - Subject:
 *   Maintains a list of observers, facilitates adding or removing observers.
 *
 * - Observer:
 *   Provides an update interface for objects that need to be notified of a Subject's
 *   changes of state.
 *
 * - ConcreteSubject:
 *   Broadcasts notifications to Observers on changes of state, stores the state of
 *   ConcreteObservers.
 *
 * - ConcreteObserver:
 *   Stores a reference to the ConcreteSubject, implements an update interface for
 *   the Observer to ensure state is consistent with the Subject.
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

// Observer ////////////////////////////////////////////////////////////////////
function ObserverList() {
  this.observers = [];
}

ObserverList.prototype = {

  add: function(obj) {
    return this.observers.push(obj);
  },

  empty: function() {
    this.observers = [];
  },

  count: function() {
    return this.observers.length;
  },

  get: function(index) {
    if (index > -1 && index < this.observers.length) {
      return this.observers[index];
    }
  },

  insert: function(obj, index) {
    var pointer = -1;

    if (index === 0) {
      this.observers.unshift(obj);
      pointer = index;
    } else if (index > 0 && index < this.observers.length) {
      this.observers.splice(index, 0, obj);
      pointer = index;
    } else {
      pointer = this.observers.push(obj);
    }

    return pointer;
  },

  get: function(index) {
    if (index >= 0 && index < this.observers.length) {
      return this.observers[index];
    }
  },

  indexOf: function(obj, startIndex) {
    var i = startIndex || 0, pointer = -1;

    while (i < this.observers.length) {
      if (obj === this.observers[i]) {
        pointer = i;
      }
      ++i;
    }

    return pointer;
  },

  removeIndexAt: function(index) {
    if (index >= 0 && index < this.observers.length) {
      this.observers.splice(index, 1);
    }
  },
};

// Subject /////////////////////////////////////////////////////////////////////
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype = {

  addObserver: function(observer) {
    this.observers.add(observer);
  },

  removeObserver: function(observer) {
    this.observers.removeIndexAt(this.observers.indexOf(observer));
  },

  notify: function(context) {
    for (var i = 0, count = this.observers.count(); i < count; ++i) {
      ob = this.observers.get(i);
      if (ob.update) ob.update(context);
    }
  }
};

// Observer ////////////////////////////////////////////////////////////////////
function Observer() {
  this.update = function() {
    // ...
  }
}

// Extend //////////////////////////////////////////////////////////////////////
function extend(extension, obj) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

// Usage ///////////////////////////////////////////////////////////////////////

var controlCheckbox = document.getElementById('mainCheckbox'),
    addBtn = document.getElementById('addNewObserver'),
    container = document.getElementById('observerContainer');

// Concrete Subject!
// Extend the controlling checkbox with the Subject class (multiple inheritance).
extend(new Subject(), controlCheckbox);

// Clicking the checkbox will trigger notifications to its observers.
controlCheckbox['onClick'] = function() {
  controlCheckbox.notify(controlCheckbox.checked);
}

// Concrete Observer!
addBtn['onClick'] = function() {
  // Create a new checkbox to be added.
  var check = document.createElement('input');
  check.type = 'checkbox';

  // Extend the checkbox with the Observer class.
  extend(new Observer(), check);
  check.update = function(context) {
    this.checked = context;
  };

  // Add the new observer to our list of observers for our main subject.
  controlCheckbox.addObserver(check);

  // Append the item to the container.
  container.appenChild(check);
}
