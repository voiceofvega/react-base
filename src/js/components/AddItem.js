var React = require('react');

// This is a standard React Component.
// Notice that the inputs are transferred to a Callback registered in Props.

var AddItem = React.createClass({
  handleSubmit: function(e){
    if(e.keyCode === 13){
      var newItem = this.refs.newItem.getDOMNode().value;
      this.refs.newItem.getDOMNode().value = '';
      this.props.add(newItem);    // --- HERE IS THE CALLBACK
    }
  },
  render: function(){
    return (
      <div>
        <input type="text" ref="newItem" className="form-control" placeholder="New Item" onKeyDown={this.handleSubmit}  />
      </div>
    )
  }
});

module.exports = AddItem;