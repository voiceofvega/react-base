var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var i18n = require('i18next-client');
var XLations = require('./constants/XLations');


var Navbar = require('./components/Navbar');
var HomePage = require('./components/Home');
var TodoPage = require('./components/Todo');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Navbar />
        <div>
          <RouteHandler />
        </div>
      </div>
      )
  }
});

var routes = (
  <Route path='/app/' handler={App}>
    <DefaultRoute handler={HomePage} />
    <Route name='home' handler={HomePage} />
    <Route name='todo' handler={TodoPage} />
  </Route>
);

i18n.init({resStore: XLations, lng:'fr-FR'}, function(err,t) {
  Router.run(routes, function(Handler, State) {
    console.log("Router.State: ", State);
    React.render(<Handler/>, document.getElementById('main'));
  });
});
