/**
 * Normal Singleton Pattern
 *
 * *****************************************************************************
 *
 * Pros:
 *   It is useful when exactly one object is needed to coordinate others across
 *   a system.
 *
 * Cons:
 *   Deferring execution is considered important for a Singleton. While the
 *   Singleton has valid uses, often when we find ourselves needing it in Java-
 *   Script, it's a sign that we may need to reevaluate our design.
 *   Miller Medeiros: http://www.ibm.com/developerworks/webservices/library/co-single/index.html
 */
var mySingleton = (function() {
  // Instance stores a reference to the Singleton.
  var instance;

  function init() {
    // Singleton ///////////////////////////////////////////////////////////////
    // Private /////////////////////////////////////////////////////////////////
    function privateMethod() {
      console.log('I am private');
    }

    var privateVariable = 'I am also private';
    var privateRandomNumber = Math.random();

    // Public //////////////////////////////////////////////////////////////////
    return {
      publicMethod: function() {
        console.log('The public can see me!');
      },
      publicProperty: 'I am also public',
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

// Usage:
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());
