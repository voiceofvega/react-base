var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
// May use object-assign polyfill (ES6)
var objectAssign = require('react/lib/Object.assign');
// NodeJS API
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// The MODEL -- Data maintained by this Store.
var _store = {
  list: []
};

// The SETTERS - Private to this Module. Update Model Data.
var addItem = function(item){
  _store.list.push(item);
};
var removeItem = function(index){
  _store.list.splice(index, 1);
};

// The STORE itself
var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  // The exposed GETTERS
  getList: function(){
    return _store.list;
  },
});

// Registration with AppDispatcher
AppDispatcher.register(function(payload){
  if(payload.source === appConstants.actionSources.VIEW) {
    var action = payload.action;
    switch(action.actionType){
      case appConstants.ADD_ITEM:
        addItem(action.data);
        break;
      case appConstants.REMOVE_ITEM:
        removeItem(action.data);
        break;
      default:
        return true;
    }
  } else if(payload.source === appConstants.actionSources.SERVER) {
    if(payload.action.ok) {
      console.log("TodoStore handles Server Action: ", payload.action);
      addItem(payload.action.resultData.body);
    } else {
      addItem("TodoStoreErreur: " + payload.action.errCode);
    }
  } else {
    return true;
  }
  console.log("TodoStore emits CHANGE_EVENT after: ", payload);
  todoStore.emit(CHANGE_EVENT);
});

// Only the STORE itself is exported.
module.exports = todoStore;