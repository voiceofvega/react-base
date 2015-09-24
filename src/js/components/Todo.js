var React = require('react');
var ListContainer = require('./ListContainer');

var Todo = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <ListContainer />
        </div>
      </div>
    )
  }
});

module.exports = Todo;
