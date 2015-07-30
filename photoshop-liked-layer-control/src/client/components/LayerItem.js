var LayerItem = React.createClass({

  propTypes: {
    isVisible: React.PropTypes.bool,
    isLocked: React.PropTypes.bool,
    name: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      isVisible: this.props.isVisible,
      isLocked: this.props.isLocked
    };
  },

  render: function() {
    return (
      <li className='ui-sortable'>
        <input
          type='checkbox'
          checked={this.state.isVisible}
          className='visibility-toggle'
          onChange={this._toggleVisible} />
        <input
          type='checkbox'
          checked={this.state.isLocked}
          className='locker-toggle'
          onChange={this._toggleLocked}/>
        <input
          type='text'
          placeholder='item'
          value={this.props.name} />
      </li>
    );
  },

  //////////////////////////////////////////////////////////////////////////////
  // Private Functions /////////////////////////////////////////////////////////

  _toggleVisible: function(e) {
    this.setState({
      isVisible: !this.state.isVisible
    });
  },

  _toggleLocked: function(e) {
    this.setState({
      isLocked: !this.state.isLocked
    });
  }

});

module.exports = LayerItem;
