/** This shows an example of test for a View-Controller component,
 * with Mock injections for dependencies (e.g. Stores).
 */
 describe("ListContainer (View-Controller)", function() {
	var React = require('react/addons');
	var TestUtils = React.addons.TestUtils;
	var ListContainer = require('../../src/js/components/ListContainer');
	var TestHelpers = require('../helpers/TestHelpers');

	var addChangeSpy, removeChangeSpy, getListSpy, storeMock;

	beforeEach(function() {
		addChangeSpy = jasmine.createSpy("Store.addChangeListener");
		removeChangeSpy = jasmine.createSpy("Store.removeChangeListener");
		getListSpy = jasmine.createSpy("Store.getList");
		storeMock = {
			getList: function() {
				getListSpy();
				return ["Item 1", "Item 2", "Item 3"];
			},
			addChangeListener: addChangeSpy,
			removeChangeListener: removeChangeSpy
		};

	});


	it('should register/unregister a Listener on todoStore', function() {
		// Mount
		var container = document.createElement('div');
		var reactComponent = React.render(<ListContainer todoStore={storeMock} />, container);
		expect(addChangeSpy).toHaveBeenCalledWith(jasmine.any(Function));
		expect(removeChangeSpy).not.toHaveBeenCalled();
		expect(getListSpy.calls.count()).toBe(1);
		var onChangeFn = addChangeSpy.calls.mostRecent().args[0];
		expect(onChangeFn).toEqual(jasmine.any(Function));

		// Emit Change event
		onChangeFn();
		expect(getListSpy.calls.count()).toBe(2);

		// Unmount
		var unmountSuccess = React.unmountComponentAtNode(container);
		expect(unmountSuccess).toBe(true);
		expect(removeChangeSpy).toHaveBeenCalled();
	});

	it('should have been rewireify-ed', function() {
		var oldAddItem = ListContainer.__get__('AddItem');
		expect(oldAddItem).not.toBeUndefined();
	});

	it('should be possible to stub a Dependency', function() {
		var oldAddItem = ListContainer.__get__('AddItem');
		expect(oldAddItem).not.toBeUndefined();
		var stubAddItem = React.createClass({
			render: function() {
				return (<div className='HELLO'>STUBBED--ADD--ITEM</div>)
			}
		});
		ListContainer.__set__("AddItem", stubAddItem);
		var container = document.createElement('div');
		var reactComponent = React.render(<ListContainer todoStore={storeMock} />, container);
		var addComponent = TestUtils.findRenderedDOMComponentWithClass(reactComponent,'HELLO');
		expect(addComponent).not.toBeUndefined();
		var addDom = React.findDOMNode(addComponent);
		expect(addDom.innerHTML).toBe("STUBBED--ADD--ITEM");
	});

	it('should be possible to stub a dependency with a Mocked Component.', function() {
		var oldAddItem = ListContainer.__get__('AddItem');
		expect(oldAddItem).not.toBeUndefined();
		var StdAddItem = require('../../src/js/components/AddItem');

		TestHelpers.injectMock(ListContainer, 'AddItem');
		var container = document.createElement('div');
		var reactComponent = React.render(<ListContainer todoStore={storeMock} />, container);
		var comps = TestHelpers.findMocks(reactComponent, 'AddItem');
		expect(comps.length).toBe(1);
	});

 });