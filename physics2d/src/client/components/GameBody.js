/**
 * google.maps.Map instance.
 * Ref: https://developers.google.com/maps/documentation/javascript/reference
 */
var googleMap; // google.maps.Map
var gameCanvas;
var gameMapInput;

var DEFAULT_LOCATION = {address: 'Taipei City, Taiwan',
                        lat: 25.031277945949384,
                        lng: 121.54492634773261
                       };
var DEFAULT_ZOOM = 18;

/**
 * React.Component
 *
 */
var GameMapInput = React.createClass({

  onChange: function(e) {
    this.setState({
      inputValue: e.target.value
    });
    console.log('onChange', this.state.inputValue);
  },

  onInput: function(e) {
    console.log('onInput', e.target.value);
  },

  onSubmit: function(e) {
    console.log('onSubmit', e.target.value);
  },

  //////////////////////////////////////////////////////////////////////////////
  // React Built-in ////////////////////////////////////////////////////////////

  getInitialState: function() {
    return {inputValue: DEFAULT_LOCATION.address};
  },

  componentDidMount: function() {
    var self = this;

    gameMapInput = new google.maps.places.Autocomplete(
      document.getElementById('search-box')
    );
    gameMapInput.addListener('place_changed', function() {
      var place = gameMapInput.getPlace();

      self.setState({inputValue: place.formatted_address});
      googleMap.setCenter({
        lat: place.geometry.location.G,
        lng: place.geometry.location.K
      });
      googleMap.setZoom(DEFAULT_ZOOM);
    });
  },

  render: function() {
    console.log('render, state=', this.state);
    return (
      <div className='search-container'>
        <input id='search-box' className='search-box' type='text' value={this.state.inputValue} onChange={this.onChange} onInput={this.onInput} onSubmit={this.onSubmit} placeholder="Enter a location" />
        <button type="button" className='search-button'>Edit</button>
      </div>
    );
  }
});

/**
 * React.Component
 *
 */
var GameMap = React.createClass({

  getInitialState: function() {
    return {display: false};
  },

  componentDidMount: function() {
    googleMap = new google.maps.Map(document.getElementById('google-map'));
    googleMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    googleMap.setCenter({
      lat: DEFAULT_LOCATION.lat,
      lng: DEFAULT_LOCATION.lng
    });
    googleMap.setZoom(DEFAULT_ZOOM);
  },

  render: function() {
    return (
      <div>
        <canvas id='game-canvas' className='game-canvas game-canvas-disabled' />
        <div id='google-map' className='google-map'></div>
      </div>
    );
  }
});

/**
 * React.Component
 *
 */
var GameBody = React.createClass({

  componentDidMount: function() {
    // DEBUG purpose.
    window.googleMap = googleMap;
    window.gameCanvas = gameCanvas;
    window.gameMapInput = gameMapInput;
  },

  render: function() {
    return (
      <div id="game">
        <GameMapInput />
        <GameMap />
      </div>
    );
  }
});

module.exports = GameBody;
