var React = require('react');
var MockableClass = React.createClass({
	render: function() {
		return (
			<input type='text' ref='myinput' defaultValue='25'/>
		)
	}
});

module.exports = MockableClass;