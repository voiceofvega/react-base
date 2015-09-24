describe("AddItemComponent", function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;
	var AddItem = require('../../src/js/components/AddItem');
	var container;
	
	beforeEach(function() {
		// Needed only using React.render instead of TestUtils.renderIntoDocument
		// container = document.createElement('div');
	});
	// Needed only if re-rendering in the same node
	// afterEach(function(done) {
	//      React.unmountComponentAtNode(container);
	//		setTimeout(done);
	// });

	it("should be able to Render something", function() {
		var reactComponent = TestUtils.renderIntoDocument(<AddItem />);
		expect(reactComponent).not.toBe(undefined);
		expect(reactComponent).not.toBe(null);
	});
	
	it("should give a DIV node", function() {
		var reactComponent = TestUtils.renderIntoDocument(<AddItem />);
		var domElement = React.findDOMNode(reactComponent);
		expect(domElement.tagName).toBe('DIV');
	});
	
	it("should have an Input child (DOM method)", function() {
		var reactComponent = TestUtils.renderIntoDocument(<AddItem />);
		var domElement = React.findDOMNode(reactComponent);
		var inputChilds = domElement.getElementsByTagName('input');
		expect(inputChilds.length).toBe(1);
	});
	
	it("should have an Input child (TestUtils method)", function() {
		var handler = jasmine.createSpy('InputHandler');
		var reactComponent = TestUtils.renderIntoDocument(<AddItem add={handler}/>);
		var inputComponent = TestUtils.findRenderedDOMComponentWithTag(reactComponent,'input');
		expect(TestUtils.isDOMComponent(inputComponent)).toBe(true);
		var inputDomNode = React.findDOMNode(inputComponent);
		expect(inputDomNode.tagName).toBe('INPUT');
		expect(inputDomNode.hasAttributes()).toBe(true);
		expect(inputDomNode.getAttribute('placeholder')).toBe("New Item");
	});

	it("should have an Input child (accessed by refs)", function() {
		var handler = jasmine.createSpy('InputHandler');
		var reactComponent = TestUtils.renderIntoDocument(<AddItem add={handler}/>);
		var inputDomNode = React.findDOMNode(reactComponent.refs.newItem);
		expect(inputDomNode.tagName).toBe('INPUT');
		expect(inputDomNode.hasAttributes()).toBe(true);
		expect(inputDomNode.getAttribute('placeholder')).toBe("New Item");
	});
	
	it("should call its Handler with the set value", function() {
		var handler = jasmine.createSpy('InputHandler');
		var reactComponent = TestUtils.renderIntoDocument(<AddItem add={handler}/>);
		// OR (works also): var reactComponent = React.render(<AddItem add={handler}/>, container);
		var domElement = React.findDOMNode(reactComponent);
		var inputChilds = domElement.getElementsByTagName('input');
		inputChilds[0].value="hello";
		expect(inputChilds[0].value).toBe("hello");
		expect(inputChilds[0].getAttribute('placeholder')).toBe("New Item");
		TestUtils.Simulate.keyDown(inputChilds[0], { key: 'Enter', keyCode: 13, which: 13});
		expect(handler).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith("hello");
	});

});