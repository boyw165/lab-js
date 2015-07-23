/**
 * Normal Module Pattern
 * Pros:
 *   It supports private data.
 * Cons:
 *   As we access both public and private members differently, when we wish to
 *   change visibility, we actually have to make changes to each place the member
 *   was used.
 */
var Module = (function() {
  // Private ///////////////////////////////////////////////////////////////////
  var counter = 0;

  // Public ////////////////////////////////////////////////////////////////////
  return {

    incrementCounter: function() {
      return ++counter;
    },

    resetCounter: function() {
      counter = 0;
    }
  };
})();

/**
 * Christian Heilmann's Revealing Module Pattern
 */
var RevealingModule = (function() {
  // Private ///////////////////////////////////////////////////////////////////
  var privateVar = 'Ben Cherry',
      publicVar = 'Hey there!';

  function privateFunction() {
    console.log('Name: ', privateVar);
  }

  function publicSetName(strName) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  // Public ////////////////////////////////////////////////////////////////////
  // Reveal public pointers to private functions and properties
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };
})();
