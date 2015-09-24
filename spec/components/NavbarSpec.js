describe("NavbarComponent", function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;
	var Router = require('react-router');
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	it("should be able find TestUtils", function() {
			expect(TestUtils).not.toBe(undefined);
	});

	it("should have 2 <a>", function() {
		var App = React.createClass({
			render: function() {	return null;	}
		});
var routes = (
  <Route path='/' handler={App}>
    <DefaultRoute handler={App} />
    <Route name='home' handler={App} />
    <Route name='todo' handler={App} />
  </Route>
);

Router.run(routes, function(Handler, State) {
	console.log("Router.State: ", State);
});


		var navComponent = require('../../src/js/components/Navbar');
		console.log("\nNavComponent: ", navComponent);
		var shallowRenderer = TestUtils.createRenderer();
		shallowRenderer.render(navComponent);
		var result = shallowRenderer.getRenderOutput();
		console.log("\nShallow Rendered: ", result);
		expect(result.type).toBe('div');

		var rChildren = result._store.props;
		for(var child in rChildren) {
			console.log("A Store Child Props: ", child);
			if(child.children) {
				for(var child2 in child.children) {
					console.log("Child Props: ", child2);
				}
			}
		}


		  var links = TestUtils.scryRenderedDOMComponentsWithTag(result, 'div');
		//	expect(links.length).toBe(2);

		var rendered = TestUtils.renderIntoDocument(<navComponent/>);

		var objArray = TestUtils.findAllInRenderedTree(rendered, function(c) {	return true;	});
		for(var o in objArray) {
//			console.log("Elt in Rendered: ", o);
		}

		  var links = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'Link');
//			expect(links.length).toBe(2);
	});
});