// var SearchExample = React.createClass({

//   getInitialState: function(){
//     return { searchString: '' };
//   },

//   handleChange: function(e){

//     // If you comment out this line, the text box will not change its value.
//     // This is because in React, an input cannot change independently of the value
//     // that was assigned to it. In our case this is this.state.searchString.

//     console.log(e);

//     this.setState({searchString:e.target.value});
//   },

//   render: function() {

//     var libraries = this.props.items,
//         searchString = this.state.searchString.trim().toLowerCase();


//     if(searchString.length > 0){

//       // We are searching. Filter the results.

//       libraries = libraries.filter(function(l){
//         return l.name.toLowerCase().match( searchString );
//       });

//     }

//     return (
//       <div>
//         <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Select a map" />
//         <ul>
//         {
//           libraries.map(function(l) {
//             return <li>{l.name} <a href={l.url}>{l.url}</a></li>
//           })
//         }
//         </ul>
//       </div>
//     );
//   }
// });


// var libraries = [

//   { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
//   { name: 'AngularJS', url: 'https://angularjs.org/'},
//   { name: 'jQuery', url: 'http://jquery.com/'},
//   { name: 'Prototype', url: 'http://www.prototypejs.org/'},
//   { name: 'React', url: 'http://facebook.github.io/react/'},
//   { name: 'Ember', url: 'http://emberjs.com/'},
//   { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
//   { name: 'Dojo', url: 'http://dojotoolkit.org/'},
//   { name: 'Mootools', url: 'http://mootools.net/'},
//   { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
//   { name: 'Lodash', url: 'http://lodash.com/'},
//   { name: 'Moment', url: 'http://momentjs.com/'},
//   { name: 'Express', url: 'http://expressjs.com/'},
//   { name: 'Koa', url: 'http://koajs.com/'},

// ];

// // Render the SearchExample component on the page

// React.render(
//   <SearchExample items={ libraries } />,
//   document.getElementById('searchbox1')
// );

// var GameMapSelector = require('./components/GameMapSelector');

// React.render(
//   <GameMapSelector />,
//   document.getElementById('searchbox2')
// );


$(document).ready(function() {
  // var test = require('./test');
  // test();

  var GameBody = require('./components/GameBody');

  React.render(<GameBody />, document.getElementById('game-container'));
});
