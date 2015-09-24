var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Navbar = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <Link to="home">Home</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="todo">Todo</Link>
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
