var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var StdTodoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

var ListContainer = React.createClass({
  propTypes: {
    todoStore: React.PropTypes.shape({
      getList: React.PropTypes.func.isRequired,
      addChangeListener: React.PropTypes.func.isRequired,
      removeChangeListener: React.PropTypes.func.isRequired
    })
  },
  getDefaultProps: function() {
    return {
      todoStore: StdTodoStore
    };
  },
  getInitialState: function(){
    return {
      // Récup ETAT INITIAL depuis LE STORE
      list: this.props.todoStore.getList()
    };
  },
  componentDidMount: function(){
    console.log("ListContainer.componentDidMount");
    // Enreg. d'un LISTENER auprès du STORE
    this.props.todoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    console.log("ListContainer.componentWillUnmount");
    this.props.todoStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    // Action: On ne fait PAS setState -- Flux Archi !
    todoActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  handleFetchRemote: function(e) {
    todoActions.fetchRemoteItem(this.state.list.length);
    // This is important - otherwise the Router will transition to #/
    e.preventDefault();
  },
  _onChange: function(){
    // Le LISTENER va récup. le NOUVEL ETAT du STORE
    this.setState({
      list: this.props.todoStore.getList()
    });
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <div>
            <a href="#" onClick={this.handleFetchRemote}>Fetch from server</a>
          </div>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;