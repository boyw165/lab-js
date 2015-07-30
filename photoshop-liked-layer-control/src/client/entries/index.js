$(document).ready(function() {
  var LayerContainer = require('../components/LayerContainer');

  var layers = [{isVisible: true, isLocked: false, name: 'layer 1'},
                {isVisible: false, isLocked: true, name: 'layer 2'},
                {isVisible: false, isLocked: false, name: 'layer 3'},
                {isVisible: true, isLocked: false, name: 'layer 4'},
                {isVisible: false, isLocked: true, name: 'layer 5'}];

  React.render(
      <LayerContainer layers={layers}/>,
    document.getElementById('example')
  );
});
