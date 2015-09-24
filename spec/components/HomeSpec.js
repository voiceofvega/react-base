describe("HomeComponent", function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;

	it("should be able to run a test", function() {
			expect(true).toBe(true);
	});

	it("should have 2 uls", function() {
		var HomeComponent = require('../../src/js/components/Home');
		var renderedHome = TestUtils.renderIntoDocument(<HomeComponent/>);

		  var uls = TestUtils.scryRenderedDOMComponentsWithTag(renderedHome, 'ul');
			expect(uls.length).toBe(2);
	});
});