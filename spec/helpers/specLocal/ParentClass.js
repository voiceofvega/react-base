var React = require('react');
var MockableClass = require('./MockableClass');

var ParentClass = React.createClass({
	render: function() {
		return (
			<MockableClass {...this.props} />
		)
	}
});

module.exports = ParentClass;