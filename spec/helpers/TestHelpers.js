'use strict';
require('babel/polyfill');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var jsonPrune = require('json-prune'); 

var TestHelpers = (function() {

	/** This is ES6 */
	var oldClasses = new Map();

	/**
	 * Creates a Mock of a React class.
	 * Several components may have the same id (it is
	 * inserted as the className).
	 * The Props are in the body.
	 */
	function _mockClass(id) {
		return React.createClass({
			render: function() {
				// Avoid circular refs. and limit depth (6) and array length (50)
			  var body = '(' + jsonPrune(this.props) + ')';
			  //console.log("PROPS: ", body);
				return (<div className={id}>{body}</div>)
			}
		});
	}

	/**
	 * Injects a Mock of a Dependency in a parent.
	 * Ex. if the <List> contains <Item>s (var Item = require('.../Item')),
	 * the Item dependency will be replaced by mocks.
	 * Rewireify must have been run on the parent module.
	 */
	function _injectMock(parentReactClass, mockedClassName) {
		var Mock = _mockClass("mocked_" + mockedClassName);
		var OldClass = parentReactClass.__get__(mockedClassName);
		parentReactClass.__set__(mockedClassName, Mock);
		oldClasses.set(mockedClassName, OldClass);
	}

  /**
   * Removes an injected Mock and restores the previous
   * dependency.
   */
	function _unMock(parentReactClass, mockedClassName) {
		if(oldClasses.has(mockedClassName)) {
			var OldClass = oldClasses.get(mockedClassName);
			oldClasses.delete(mockedClassName);
			parentReactClass.__set__(mockedClassName, OldClass);
		}
	}

	/**
	 * After having rendered a reactComponent, returns the included
	 * Mocked components of a type (mockedClassName).
	 * The Returned array is composed of Javascript objects that are the
	 * "props" injected in the component. Functions (onClick..) are ignored.
	 */
	function _findMocks(parentReactComponent, mockedClassName) {
		var array = TestUtils.scryRenderedDOMComponentsWithClass(parentReactComponent,"mocked_" + mockedClassName);
		var ret = [];
		if(array) {
			for(var i=0; i < array.length; i++) {
				var domNode = React.findDOMNode(array[i]);
				var oneProps = eval(domNode.innerHTML);
				ret.push(oneProps);
			}
		}
		return ret;
	}


	return {
		mockClass: _mockClass,
		injectMock: _injectMock,
		unMock: _unMock,
		findMocks: _findMocks
	};	
})();

module.exports = TestHelpers;
