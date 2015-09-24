describe("NavbarComponent", function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;
	var Navbar = require('../../src/js/components/Navbar');
	
	beforeEach(function() {
		this.renderer = TestUtils.createRenderer();
		this.renderer.render(<Navbar />);
	});

	it("should be able find TestUtils", function() {
			expect(TestUtils).not.toBe(undefined);
	});

	it("should have 2 Links", function() {
		
		var rendered = this.renderer.getRenderOutput();
		console.log("Rendered:", rendered);
		if(rendered.props.children) {
		  for(var child in rendered._store.children) {
		    console.log("RChild:" , child);
		  }
		}
	});
});