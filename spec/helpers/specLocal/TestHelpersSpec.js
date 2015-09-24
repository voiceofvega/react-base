describe('TestHelpers', function() {
	var TestHelpers = require('../TestHelpers');
	var ParentClass = require('./ParentClass');
	var MockableClass = require('./MockableClass');
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;	

	it('exposes the test functions', function() {
		expect(TestHelpers).not.toBeUndefined();
		expect(TestHelpers.mockClass).not.toBeUndefined();
		expect(TestHelpers.injectMock).not.toBeUndefined();
		expect(TestHelpers.unMock).not.toBeUndefined();
		expect(TestHelpers.findMocks).not.toBeUndefined();
	});

	it('can render the unmocked test components', function() {
		var TestComponent2 = TestUtils.renderIntoDocument(<ParentClass/>);
		var inpComps2 = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent2, 'input');
		expect(inpComps2.length).toBe(1);
	});

	it('can create a Mock React Class without props', function() {
		var MockComponent = TestHelpers.mockClass("toto");
		var TestComponent = TestUtils.renderIntoDocument(<MockComponent/>);
		var inpComps = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent, 'div');
		expect(inpComps.length).toBe(1);
		var domNode = React.findDOMNode(inpComps[0]);
		var innerHtml = domNode.innerHTML;
		expect(innerHtml).toBe("({})");
	});

	it('can create a Mock React Class with props', function() {
		var MockComponent = TestHelpers.mockClass("toto");
		var TestComponent = TestUtils.renderIntoDocument(<MockComponent prop1="hi" prop2="123" />);
		var inpComps = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent, 'div');
		expect(inpComps.length).toBe(1);
		var domNode = React.findDOMNode(inpComps[0]);
		var innerHtml = domNode.innerHTML;
		var expected = '({"prop1":"hi","prop2":"123"})';
		expect(innerHtml).toBe(expected);
	});

	it('can Mock a React Class dependency', function() {
		// Check without mocking
		var TestComponent = TestUtils.renderIntoDocument(<ParentClass/>);
		var inpComps = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent, 'input');
		expect(inpComps.length).toBe(1);
		expect(TestHelpers.findMocks(TestComponent, 'MockableClass').length).toBe(0);
		// Check mockable
		expect(ParentClass.__get__('MockableClass')).not.toBeUndefined();
		expect(ParentClass.__get__('MockableClass')).not.toBe(null);

		// Now, mock
		TestHelpers.injectMock(ParentClass, 'MockableClass');
		var TestComponent2 = TestUtils.renderIntoDocument(<ParentClass/>);
		var inpComps2 = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent2, 'input');
		expect(inpComps2.length).toBe(0);
		expect(TestHelpers.findMocks(TestComponent2, 'MockableClass').length).toBe(1);
		// Restore
		TestHelpers.unMock(ParentClass, 'MockableClass');
	});

	it('can Retrieve the props passed to a Mocked dependency', function() {
		TestHelpers.injectMock(ParentClass, 'MockableClass');
		var TestComponent = TestUtils.renderIntoDocument(<ParentClass prop1="salut" prop2="comment tu vas"/>);
		var renderedMocksProps = TestHelpers.findMocks(TestComponent, 'MockableClass');
		expect(renderedMocksProps.length).toBe(1);
		expect(renderedMocksProps[0]).toEqual({prop1:"salut", prop2:"comment tu vas"});
		// in any order
		expect(renderedMocksProps[0]).toEqual({prop2:"comment tu vas", prop1:"salut"});
		// Restore
		TestHelpers.unMock(ParentClass, 'MockableClass');
	});

	it('can unmock', function() {
		TestHelpers.injectMock(ParentClass, 'MockableClass');
		var TestComponent = TestUtils.renderIntoDocument(<ParentClass/>);
		var inpComps = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent, 'input');
		expect(inpComps.length).toBe(0);
		// Unmock
		TestHelpers.unMock(ParentClass, 'MockableClass');
		var TestComponent2 = TestUtils.renderIntoDocument(<ParentClass/>);
		var inpComps2 = TestUtils.scryRenderedDOMComponentsWithTag(TestComponent2, 'input');
		expect(inpComps2.length).toBe(1);
		console.log("Restored:", React.renderToString(<ParentClass/>));
	});

});
