var LayerItem = require('./LayerItem');

var eyeSvg = <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 48 48"><path d="M0 0h48v48h-48z" fill="none"/><path d="M24 9c-10 0-18.54 6.22-22 15 3.46 8.78 12 15 22 15s18.54-6.22 22-15c-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/></svg>;

var lockSvg = <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512"><path d="M368,239h-16v-96c0-52.938-43.063-96-96-96s-96,43.063-96,96v32h32v-32c0-35.344,28.656-64,64-64s64,28.656,64,64v96H144 c-43.313,57.75-35.609,139,17.797,187.563c53.406,48.594,134.984,48.594,188.422,0C403.625,378,411.313,296.75,368,239z M272,362.094V402c0,8.844-7.156,16-16,16s-16-7.156-16-16v-39.906c-9.391-5.594-16-15.375-16-27.094c0-17.688,14.328-32,32-32 s32,14.313,32,32C288,346.719,281.391,356.5,272,362.094z"/></svg>;

var LayerContainer = React.createClass({

  propTypes: {
    layers: React.PropTypes.array
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var layers = [];

    this.props.layers.forEach(function(layer) {
      layers.push(<LayerItem
                    isVisible={layer.isVisible}
                    isLocked={layer.isLocked}
                    name={layer.name} />);
    });

    return (
      <div className='noselect'>
        <ul
          onMouseDown={this._onMouseDown}
          onMouseUp={this._onMouseUp}>
          onMouseMove={this._onMouseMove}>
          <li>
            <table>
              <tr>
              <td>{eyeSvg}</td>
              <td>{lockSvg}</td>
              <td>Layer Name / Snapshot</td>
              </tr>
            </table>
          </li>
          {layers}
        </ul>
      </div>
    );
  },

  //////////////////////////////////////////////////////////////////////////////
  // Private Functions /////////////////////////////////////////////////////////

  _onMouseDown: function(e) {
    console.log('on mousedown, e=', e.target);
  },

  _onMouseUp: function(e) {
    console.log('on mouseup, e=', e.target);
  },

  _onMouseMove: function(e) {
    console.log('on mousemove e=', e.target);
  }

});

module.exports = LayerContainer;
