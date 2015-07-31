$(document).ready(function() {
  var LayerContainer = require('../views/LayerContainer.react');
  var layerFactory = require('../views/layerFactory');

  // Initialize the store, action and dispatcher.
  var factory = layerFactory([{isVisible: true, isLocked: false, snapshot: 1111},
                              {isVisible: false, isLocked: true, snapshot: 2222},
                              {isVisible: false, isLocked: false, snapshot: 3333},
                              {isVisible: true, isLocked: false, snapshot: 4444},
                              {isVisible: false, isLocked: true, snapshot: 5555}]);

  window.store = factory.store;

  window.reactRoot = React.render(
    <LayerContainer store={factory.store} action={factory.action} />,
    document.getElementById('example')
  );
});
